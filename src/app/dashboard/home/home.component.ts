import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import BingMaps from 'ol/source/BingMaps.js';
import { fromLonLat } from 'ol/proj.js';
import { defaults as defaultControls, FullScreen } from 'ol/control.js';
import { defaults as defaultInteractions } from 'ol/interaction.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import XYZ from 'ol/source/XYZ';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userName: string;
  public map: Map;
  public map1: Map;
  public map2: Map;
  public showSidebar: boolean = false;
  public tile: boolean = true;
  public raster: boolean;
  public msg: any = "tile";
  public crop: boolean = false;
  public loadCrop: boolean = false;
  loadImage: boolean;
  scrolling: boolean =false;
  public style: object = {};
  public save:boolean=false;
  public resposition:any;
  public left_axis: any;
  public top_axis: any;
  pos: any;
  height_axis: any;
  width_axis: any;

  constructor(private titleService: Title,private toastr: ToastrService,
    public authService: AuthService, private ballLoader: NgxSpinnerService) {

  }

  ngOnInit() {
    this.titleService.setTitle("Home");
    let all = JSON.parse(localStorage.getItem("userInfo"));
    this.userName = all !== null ? all.displayName : "Guest";
    this.initilizeMap();
    this.pos=JSON.parse(localStorage.getItem("postion"));
    this.top_axis =this.pos !== null ? this.pos.top : "7vh";
    this.left_axis =this.pos !== null ? this.pos.left : "10vw";
    this.height_axis =this.pos !== null ? this.pos.height : "70vh";
    this.width_axis =this.pos !== null ? this.pos.width : "80%";
  }

  public initilizeMap = () => {
    this.crop = false;
    this.loadCrop = false;
    if (this.msg === "tile") {
      this.map = new Map({
        controls: defaultControls().extend([
          new FullScreen()
        ]),
        target: 'tile',
        loadTilesWhileInteracting: true,
        layers: [new Tile({
          preload: Infinity,
          source: new OSM()
        })],
        view: new View({
          center: fromLonLat([75, 17]),
          zoom: 5
        })
      });
    }
    else {
      this.map1 = new Map({
        controls: defaultControls().extend([
          new FullScreen()
        ]),
        target: 'imageMap',
        loadTilesWhileInteracting: true,
        layers: [new TileLayer({
          preload: Infinity,
          source: new BingMaps({
            key: 'AomTKgWxCOKmJEcKKGOIxh36MTV7pG6TqzEyFZnjiVW73hq-_D8xriFM9ooP18DN',
            imagerySet: 'AerialWithLabels'
          })
        })],
        view: new View({
          center: fromLonLat([75, 17]),
          zoom: 5
        })
      });
    }


  }

  public goToCropImage = () => {
    this.toastr.info('If Map Is Not Loaded,Please Click Button Again');
    this.crop = true;
    this.msg = "crop";
    this.tile = false;
    this.raster = false;
    this.loadImage = true;
    this.cropImage();
  }

  //import XYZ from 'ol/source/XYZ';
  public cropImage = () => {
  $('#cropMap').css({"margin-left":this.left_axis,"margin-top":this.top_axis,"height":this.height_axis,"width":this.width_axis});
    if (this.crop) {
      this.map2 = new Map({
        target: 'cropMap',
        loadTilesWhileInteracting: true,
        layers: [
          new TileLayer({
            preload: Infinity,
            source: new XYZ({
              url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              crossOrigin: null
            }),
          })
        ],
        view: new View({
          center: [-472202, 7530279],
          zoom: 5
        }),
        interactions: defaultInteractions({
          doubleClickZoom: false,
          dragAndDrop: false,
          dragPan: false,
          keyboardPan: false,
          keyboardZoom: false,
          mouseWheelZoom: false,
          pointer: false,
          select: false
        })
      });
      let data = {
        top : this.top_axis,
        left: this.left_axis,
        hegiht: this.height_axis,
        width:  this.width_axis
        }
        console.log("display"+JSON.stringify(data));
    }
    else {
      this.save=true;
  $('.resizable').css({"margin-left":this.left_axis,"margin-top":this.top_axis,"height":this.height_axis,"width":this.width_axis});
      $('.resizable').resizable({
        handles: {
            'nw': '.ui-resizable-nw',
            'ne': '.ui-resizable-ne',
            'sw': '.ui-resizable-sw',
            'se': '.ui-resizable-se',
            'n': '.ui-resizable-n',
            'e': '.ui-resizable-w',
            's': '.ui-resizable-s',
            'w': '.ui-resizable-e'
        },
    });
    
    $( '.draggable' ).draggable().on('click', function(){
      if ( $(this).is('.ui-draggable-dragging') ) {
          return;
      }
      $(this).draggable( 'option', 'disabled', true );
      $(this).prop('contenteditable','true');

  })
  .on('blur', function(){
      $(this).draggable( 'option', 'disabled', false);
      $(this).prop('contenteditable','false');
  });
      this.map2 = new Map({
        target: 'cropMap1',
        loadTilesWhileInteracting: true,
        layers: [
          new TileLayer({
            preload: Infinity,
            source: new XYZ({
              url: 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              crossOrigin: null
            }),
          })
        ],
        view: new View({
          center: [-472202, 7530279],
          zoom: 5
        }),
        interactions: defaultInteractions({
          doubleClickZoom: true,
          dragAndDrop: true,
          dragPan: true,
          keyboardPan: true,
          keyboardZoom: true,
          mouseWheelZoom: true,
          pointer: true,
          select: true
        })
      });
      
    }
  }

  public scroll = () => {
    console.log(this.scrolling);
    if(this.scrolling){
      this.toastr.info('Reset the Crop');
    }
    else{
      this.toastr.info('If Map Is Not loaded Properly,Please Click Scroll Button Again');
    }
    this.crop =false;
    this.cropImage();
    this.scrolling=true;
  }


  public toggleCrop = () => {
    this.scrolling=false;
    if (this.loadCrop) {
      this.loadCrop = false;
      
    }
    else {
      this.loadCrop = true;
      
    }
    this.cropImage();
  }

  public savePosition = () => {
    var link = $("#resize");
    var offset = link.offset();
    this.height_axis = link.height();
    this.width_axis = link.width();
    this.top_axis = offset.top - 56;
    this.left_axis= offset.left;
    let data = {
      top : this.top_axis+"px",
      left: this.left_axis+"px",
      hegiht: this.height_axis+"px",
      width:  this.width_axis+"px",
      }
      console.log("save"+JSON.stringify(data));
      localStorage.setItem('postion', JSON.stringify(data));
    this.toastr.success('Saved');
  }

  public showSidebarScreen = () => {
    this.showSidebar = true;
  }

  public hideSidebarScreen = () => {
    this.showSidebar = false;
  }

  public checkbox = (status) => {
    this.loadImage = false;
    this.ballLoader.show();
    setTimeout(() => { this.ballLoader.hide(); }, 1000);
    if (status === "tile") {
      if (this.tile) {
        this.raster = true;
        this.tile = false;
        this.msg = "raster";
      }
      else {
        this.raster = false;
        this.tile = true;
        this.msg = "tile";
      }
    }
    else {
      if (this.raster) {
        this.tile = true;
        this.raster = false;
        this.msg = "tile";
      }
      else {
        this.tile = false;
        this.raster = true;
        this.msg = "raster";
      }
    }
    this.initilizeMap();
  }

  public logout = () => {
    this.ballLoader.show();
    this.authService.logout();
    setTimeout(() => { this.ballLoader.hide(); }, 500);
  }

  //Map control buttons
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.msg === "tile") {
      if (event.shiftKey && event.key == '+') {
        let view = this.map.getView();
        let zoom = view.getZoom();
        view.setZoom(zoom + 1);
      }
      if (event.shiftKey && event.key == '_') {
        let view = this.map.getView();
        let zoom = view.getZoom();
        view.setZoom(zoom - 1);
      }
    }
    else {
      if (event.shiftKey && event.key == '+') {
        let view = this.map1.getView();
        let zoom = view.getZoom();
        view.setZoom(zoom + 1);
      }
      if (event.shiftKey && event.key == '_') {
        let view = this.map1.getView();
        let zoom = view.getZoom();
        view.setZoom(zoom - 1);
      }
    }
  }



}

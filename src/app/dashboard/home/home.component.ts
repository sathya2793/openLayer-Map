import { Component, OnInit, HostListener} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import BingMaps from 'ol/source/BingMaps.js';
import {fromLonLat} from 'ol/proj.js';
import {defaults as defaultControls, FullScreen} from 'ol/control.js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
  public userName : string;
  public map:any;
  public map1:any;
  public showSidebar :boolean = false;
  public tile : boolean =true;
  public raster : boolean;
  public msg : any ="tile";

  constructor(private titleService: Title,
    public authService: AuthService,private ballLoader: NgxSpinnerService) { }

  ngOnInit() {
    this.titleService.setTitle( "Home");
    let all = JSON.parse(localStorage.getItem("userInfo"));
    this.userName = all.displayName !== null ? all.displayName : "Guest";
    this.initilizeMap();
  }

  public initilizeMap = () => {
    if(this.msg === "tile"){
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
    else
    {
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

  public showSidebarScreen = () =>{
    this.showSidebar =true;
  }

  public hideSidebarScreen = () =>{
    this.showSidebar =false;
  }

  public checkbox = (status) => {
    console.log(status);
    this.ballLoader.show(); 
        setTimeout(() => {  this.ballLoader.hide(); }, 1000);
    if(status === "tile"){
      if(this.tile){
        this.raster = true;
        this.tile=false;
        this.msg ="raster";
      }
      else{
        this.raster = false;
        this.tile = true;
        this.msg ="tile";
      }
    }
    else{
      if(this.raster){
        this.tile = true;
        this.raster =false;
        this.msg ="tile";
      }
      else{
        this.tile = false;
        this.raster =true;
        this.msg ="raster";
      }
    }
     this.initilizeMap();  
 }

  public logout = () => {
    this.ballLoader.show(); 
    setTimeout(() => { this.ballLoader.hide(); }, 500);
    this.authService.logout();
  }

    //Map control buttons
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if(this.msg === "tile"){
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
    else
    {
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

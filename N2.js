function N2( title , mesh , extraParams ){

  

  var title = title || 'HELLO';
  var mesh = mesh || new THREE.Mesh( new THREE.BoxGeometry( 1000 , 1000 , 1000 , 80 , 80 , 80 ) );
  var geometry = new THREE.Geometry();

  geometry.merge( mesh.geometry , mesh.matrix );
  
 // var geometry =  || new THREE.BoxGeometry( 1000 , 1000 , 1000 , 80 , 80 , 80 );
 

  var v = geometry.vertices.length;

  var vSize = Math.ceil( Math.sqrt( v ) );
  var hSize = .5 / vSize;


  //console.log( shaders.simulationShaders.n2 );
 
  var s = shaders.setValue( shaders.simulationShaders.n2 , 'SIZE'  , vSize+"." );
      s = shaders.setValue( s , 'HSIZE' , hSize+"" );
  
  var params =  {

    repelers: REPELERS,

    vs: shaders.vertexShaders.fire,
    fs: shaders.fragmentShaders.normal,
    ss: s,

    geometry: geometry,


    dT: G_UNIFORMS.dT,
    time: G_UNIFORMS.time,

    soul:{
       
      noiseSize:          { type:"f" , value: .001 , constraints:[.0001 , 1.] },
      noiseVariation:     { type:"f" , value: .4   , constraints:[.01 , 1.] },
      noiseChangeSpeed:   { type:"f" , value: 1   , constraints:[.0 , 5.] },
      noisePower:         { type:"f" , value: 1   , constraints:[0 , 10.] },
      returnPower:        { type:"f" , value: 5000   , constraints:[ 100 ,10000 ] },
      staticLength:       { type:"f" , value: 3.  , constraints:[ .001 ,100 ] },
      maxVel:             { type:"f" , value: .01   , constraints:[ .00001 , .1 ] },
      t_audio:            G_UNIFORMS.t_audio,

    },

    body:{
      
      audioDisplacement:{ type:"f" , value : 0.0 ,  constraints:[ 0 , 20 ]},
      
      custom1:{type:"f" , value: .04,  constraints:[ 0.00001 , 1]},
      custom2:{type:"f" , value: .31,  constraints:[ 0.00001 , 1]},
      custom3:{type:"f" , value: 1, constraints:[ 0.00001 , 1]},
    
      tmp_color1:{ type:"color" , value: 0xc0ffee },
      tmp_color2:{ type:"color" , value: 0xaa55ff },
      tmp_color3:{ type:"color" , value: 0x5500ff },

      color1:{ type:"c" , value : new THREE.Color( 0xc0ffee ) },
      color2:{ type:"c" , value : new THREE.Color( 0xaa55ff ) },
      color3:{ type:"c" , value : new THREE.Color( 0x5500ff ) },
      
      lightPos:{type:"v3" , value: new THREE.Vector3( 10 , 1 , 1 )},
      
      t_audio:   G_UNIFORMS.t_audio,

    },

  }



  //Passing through extra params
 
  var extraParams = extraParams || {};
 
  if( extraParams.soul ){
    var s = extraParams.soul;
    for( var propt in s ){
      params.soul[propt] = s[propt];
    }
  }

  if( extraParams.body ){
    var s = extraParams.body;
    for( var propt in s ){
      params.body[propt] = s[propt];
    }
  }


  if( extraParams.vs ) params.vs = extraParams.vs;
  if( extraParams.fs ) params.fs = extraParams.fs;

  var gem = new GEM( params );
 
  var gHolder = document.createElement('div');

  var tHolder = document.createElement('h1');

  tHolder.innerHTML =''+ title;

  gHolder.appendChild( tHolder );
  var guis = document.getElementById( 'GUI' );

  guis.appendChild( gHolder );

  $(tHolder).click(function(){
    this.toggle();
    if( this.active ){
      this.tHolder.className = "active";
    }else{
      this.tHolder.className = "";
    }
  }.bind( gem ));


  $(tHolder).hover(function(){
    this.gui.gui.open();
  }.bind( gem ));

  $(gHolder).hover(function(){},function(){
    this.gui.gui.close();
  }.bind(gem));

  gem.tHolder = tHolder;

  gem.gui = new GUI( params , {
   domElement: gHolder 
  });


  gem.soul.reset( gem.t_og.value );
  
  return gem;

}


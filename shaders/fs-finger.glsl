
uniform sampler2D t_audio;

uniform samplerCube t_refl;

uniform float custom1;

varying vec3 vNorm;
varying vec3 vMNorm;
varying vec3 vCamVec;
varying vec3 vMPos;


void main(){

  vec3 n = vMNorm;
  vec3 refr = refract( normalize(-vCamVec) , vec3(n.x , n.y , n.z ) , custom1 );
  vec3 refl = reflect( normalize(-vCamVec) , vec3(n.x , n.y , n.z )   );

  vec4 l_refr = textureCube( t_refl , vec3( -refr.x , refr.yz ) );
  vec4 l_refl = textureCube( t_refl , vec3( -refl.x , refl.yz ) );


  vec4 l_cam = textureCube( t_refl , -vCamVec );
  float m = max( 0. , dot( normalize(vCamVec) , normalize(vMNorm) ));
  
  vec4 aC = texture2D( t_audio , vec2( abs( dot( normalize(vCamVec) , normalize(vMNorm) )) , 0. ) );
//  aC *= texture2D( t_audio , vec2( abs( refr.y ) , 0. ) );
//  aC *= texture2D( t_audio , vec2( abs( refr.z ) , 0. ) );


  vec4 r = vec4( 1. , 0. , 0. , 1. );
  vec4 b = vec4( 0. , 0. , 1. , 1. );

  vec4 c = mix( l_refr , l_refl , (1. -  m * m ));

  //vec4 c = mix( l_refr , l_refl , length( aC ) * (1. -m*m) / 2. );
 

 // vec4 c = mix( r , b , (1. -  m  ));
  gl_FragColor = c+  (1. -  m * m * m ) * aC * aC * aC * aC;//c + aC;// c * aC * custom3;


  
}

var mp4 = require( 'mp4js' )
  , YAML = require( 'yamljs' )
  ;

function extractText( filePath, options, cb ) {
  mp4({ file: filePath, type: 'local' }, function( error, tags ) {
    if ( error ) {
      cb( error, null );
      return;
    }
    cb( null, YAML.stringify( tags, 2 );
  });
}

module.exports = {
  types: ['video/mp4', 'application/mp4'],
  extract: extractText
};

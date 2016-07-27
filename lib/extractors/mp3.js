var id3 = require( 'id3js' )
  , YAML = require( 'yamljs' )
  ;

function extractText( filePath, options, cb ) {
  id3({ file: filePath, type: id3.OPEN_LOCAL }, function( error, tags ) {
    if ( error ) {
      cb( error, null );
      return;
    }
    cb( null, YAML.stringify( tags, 2 ) );
  });
}

module.exports = {
  types: ['audio/mpeg', 'audio/mpeg-4', 'audio/x-mpeg-3'],
  extract: extractText
};

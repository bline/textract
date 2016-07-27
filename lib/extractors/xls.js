var path = require( 'path' )
  , fs = require( 'fs' )
  , tabular = require( 'tabular-stream' )
  , snake = require( 'case-snake' )
  , format = require( 'format-data' )
  ;

function extractText( filePath, options, cb ) {
  var stream, result;

  result = ''
  stream = fs.createReadSteam( filePath )
    .pipe( tabular( snake ) )
    .pipe( format( { format: 'csv', separator: '\t' } ) )
    .on( 'readable', function ( buffer ) {
      result += buffer.toString()
    })
    .on( 'error', function ( err ) {
      var error = new Error( 'Could not extract ' + path.basename( filePath ) + ', ' + err );
      cb( error, null )
    })
    .on( 'end', function () {
      cb( null, result );
    });
}

module.exports = {
  types: ['application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.oasis.opendocument.spreadsheet-template'
  ],
  extract: extractText
};

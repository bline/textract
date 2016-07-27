var path = require( 'path' )
  , fs = require( 'fs' )
  , tabular = require( 'tabular-stream' )
  , snake = require( 'snake-case' )
  , format = require( 'format-data' )
  ;

function extractText( filePath, options, cb ) {
  var stream, result, transform, error;

  result = '';
  transform = tabular( snake );
  error = null;
  transform.on( 'error', function ( err ) {
      error = new Error( 'Could not extract ' + path.basename( filePath ) + ', ' + err );
  });
  stream = fs.createReadStream( filePath )
    .on( 'data', function ( str ) {
      result += ' ' + str
    })
    .on( 'error', function ( err ) {
      error = new Error( 'Could not extract ' + path.basename( filePath ) + ', ' + err );
    })
    .on( 'end', function () {
      cb( error, result );
    })
    .pipe( transform )
    .pipe( format( { format: 'csv', separator: '\t' } ) )
    .setEncoding('utf8');
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

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment'),
    Schema = mongoose.Schema;

// session storafe connection
var connection = mongoose.createConnection('mongodb://localhost/vers', function(err) {
    if (err) {
        console.log('DB connection error:' + err);
    }
    else {return}
});

autoIncrement.initialize(connection);

// =====================================Date model==================================

var dateObj = {

    exact_date: Date,
    
    only_year: {    
        year:   Number,
        approx: String
    },

    year_month: {
        year:   Number,
        month:  String,
        approx: String
    },

    only_cent: {
        cent:   Number,
        approx: String
    },

    only_fest: {
        fest:   String,
        approx: String
    },
};

// =====================================Metric model==================================



var metrumObj = {

    comp: {
        name:          String,
        comp_type:     String,
        quality:       String,
        rep:           String,
        symbol:        String,
        symbol_type:   String,
        limit:         String,
        limit_type:    String,
        count:         Number
    }

    /*
    comp:               String,
    comp_type:          String,
    comp_quality:       String,
    comp_rep:           String,
    comp_symbol:        String,
    comp_symbol_type:   String,
    comp_limit:         String,
    comp_limit_type:    String,
    comp_count:         Number*/
};


// =====================================POEM SCHEMA==================================

var versSchema = new mongoose.Schema({

    // ==============================TEXTOLOGY===============================

    rmva:       { type: 'number', unique: true }, // rmva azonosító 
    inc:        String, // incipit


    auth_role_name: String, // szerző előnév
    auth_surname:   String, // szerző vezetéknév
    auth_add_name:  String, // szerző középső név
    auth_forename:  String, // szerző keresztnév
  
    title:      String, // cím
    arg:        String, // argumentum. ??
    adnotam:    String, // nótajelzés
    acro:       String, // akrosztichon
    acro_int:   Boolean,// akrosztichon integráns. ?? 
    krono:      String, // kronosztichon
    head:       String, // élőfej. ??

    signo_type: String, // szignáltság - SELECT!

    signo_role_name: String, // szigno előnév
    signo_surname:   String, // szigno vezetéknév: 
    signo_add_name:  String, // szigno középső név:
    signo_forename:  String, // szigno keresztnév

    lenght:     Number, // terjedelem
    lenght_unit:String, // mértékegység - SELECT!
    col:        String, // kolofón

    date:   {

        single: dateObj,

        period: {

            from: dateObj,
            to:   dateObj
        }
    },

    
    date_info:  String, // honnan tudjuk? - SELECT!
    place:      String, // keletekzés helye
    place_info: String, // honnan tudjuk? - SELECT!
    conf:       String, // felekezet
    source:     String, // forrás
    text:       String, // modern szöveg
    imgs:       [],     // array of iamge files
    link_coll:  {}, // összekapcsolt adatlap azonosítója
    created_at:
        {
            type: Date, 
            default: Date.now()
        }, // létrehozva
    created_by: String, // felhasználónév - USER API!
    last_mod:   
        {
            type: Date
        }, // utolsó módosítás

    mod_by:     String, // módosító felhasználóneve - USER API!

    // ==============================METRUM===============================

    metrum: [ 
                    
                    metrumObj
                
                    // comp_type:     String,
                    // quality:       String,
                    // rep:           String,
                    // symbol:        String,
                    // symbol_type:   String,
                    // limit:         String,
                    // limit_type:    String,
                    // count:         Number
                    // }
                // }
    ]
});

versSchema.plugin(autoIncrement.plugin, {
    model: 'Vers',
    field: 'rmva',
    startAt: 1,
    incrementBy: 1
});
mongoose.model('Vers', versSchema);

/*
*
*               Updating data structure
*
*               models.js(Schema) > index.js(routing and backend of crud api) >
*               > ng (controllers) > index.ejs and partials(forms and tables) 
*
*/
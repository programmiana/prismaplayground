const CSVToJSON = require("csvtojson");

// parser for bulk data from trefle https://github.com/treflehq/trefle-api

const headers =
  "id,scientific_name,rank,genus,family,year,author,bibliography,common_name,family_common_name,image_url,flower_color,flower_conspicuous,foliage_color,foliage_texture,fruit_color,fruit_conspicuous,fruit_months,bloom_months,ground_humidity,growth_form,growth_habit,growth_months,growth_rate,edible_part,vegetable,edible,light,soil_nutriments,soil_salinity,anaerobic_tolerance,atmospheric_humidity,average_height_cm,maximum_height_cm,minimum_root_depth_cm,ph_maximum,ph_minimum,planting_days_to_harvest,planting_description,planting_sowing_description,planting_row_spacing_cm,planting_spread_cm,synonyms,distributions,common_names,url_usda,url_tropicos,url_tela_botanica,url_powo,url_plantnet,url_gbif,url_openfarm,url_catminat,url_wikipedia_en".split(
    ","
  );
  
CSVToJSON({ headers, delimiter: ['\t']})
  .fromFile('./sample.csv')
  .preFileLine((lineString, lineIndex) => {
    return lineString.split(' ').join(' ')
  })
  .then((species) => {
    console.log(species)
  })
  .catch((err) => {
    // log error if any'
    console.log(err);
  });

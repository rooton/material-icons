
import fs from 'fs';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


Meteor.methods({

    parseDesignGoogle() {
 

        let data = Meteor.http.call('GET', 'https://design.google.com/icons/data/grid.json' );

        let grid = JSON.parse(data.content);
        
        let base_path = grid.base_path;
        let groups    = grid.groups;
        let icons     = grid.icons;
        

        console.log("icons-len: "  + icons.length);
        icons.forEach(function(item) {
            
            let name = item.id + '_black_24px.svg';
            let url  = base_path + 'icons/svg/' + name;

            console.log("group_id: " + capitalizeFirstLetter(item.group_id) + " " + name);
            
            try {
              
                let img_url = Meteor.http.call('GET', url);
            
                if(img_url !== null) {
                    fs.writeFileSync('../../../../../../'+capitalizeFirstLetter(item.group_id)+'/svg/' + name, img_url.content, 'utf8');
                }  

            } catch (e) {
                  console.log("Cannot download: " +  url );  
            }
            

        });
         

    }


});
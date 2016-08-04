
import fs from 'fs';


Meteor.methods({

    parseDesignGoogle() {
 
        try {

            let data = Meteor.http.call('GET', 'https://design.google.com/icons/data/grid.json' );

            let grid = JSON.parse(data.content);

            let base_path = grid.base_path;
            let groups    = grid.groups;
            let icons     = grid.icons;


            console.log("icons-len: "  + icons.length);
            
            icons.forEach(function(item) {
                
                try {
                    let root_dir  = '../../../../../../Downloaded_Icons/';
                    
                    let group_dir = root_dir + item.group_id + '/';

                    let svg = { dir: group_dir + 'svg/', ext: 'svg', colors: ['black', 'white'], sizes: ['18px', '24px', '36px', '48px']};
                    let png = { dir: group_dir + 'png/', ext: 'zip', colors: ['black', 'white'], sizes: ['18dp', '24dp', '36dp', '48dp']};

                    if ( ! fs.existsSync(root_dir) ) {
                        
                        fs.mkdirSync(root_dir);
                    
                    }
                    
                    
                    if( ! fs.existsSync(group_dir) ) {

                        fs.mkdirSync(group_dir);

                        if( ! fs.existsSync(svg.dir) ){
                            fs.mkdirSync(svg.dir);

                            svg.sizes.forEach(function(size) {
                                if ( ! fs.existsSync(svg.dir + size + '/') ) {
                                    fs.mkdirSync(svg.dir + size + '/');
                                }
                            });
                        }

                        if( ! fs.existsSync(png.dir) ){
                            fs.mkdirSync(png.dir);

                            png.sizes.forEach(function(size) {
                                if ( ! fs.existsSync(png.dir + size + '/') ) {
                                    fs.mkdirSync(png.dir + size + '/');
                                }
                            });
                        }
                    }



                    svg.colors.forEach(function(color) {
                        svg.sizes.forEach(function(size) {
                            
                            let title = item.id + '_' + color + '_' + size + '.' + svg.ext;
                            
                            let url  = base_path + 'icons/svg/' + title;

                            let img_url = Meteor.http.call('GET', url);

                            if(img_url !== null) {
                                fs.writeFileSync(svg.dir + size + '/' + title, img_url.content, 'utf8');
                                
                                console.log("SVG image: " + svg.dir + size + '/' + title);
                            }
                        });
                    });


                    png.colors.forEach(function(color) {
                        png.sizes.forEach(function(size) {
                            
                            let title = item.id + '_' + color + '_' + size + '.' + png.ext;
                            
                            let url  = base_path + 'icons/zip/' + title;

                            let img_url = Meteor.http.call('GET', url);

                            if(img_url !== null) {
                                fs.writeFileSync(png.dir + size + '/' + title, img_url.content, 'utf8');
                                
                                console.log("PNG/ZIP image: " + png.dir + size + '/' + title);
                            }
                        });
                    });



                } catch (e) {
                      console.log("Cannot download: " +  e.message);  
                }


            });
         
        } catch (e) {
            console.log("Connection error");
        }
        
    }
    
});
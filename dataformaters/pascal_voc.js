var pascalVocFormater = {
    fromPascalVOC : function(pascalVocData){
        if (!labellingData[pascalVocData.filename] ){
            labellingData[pascalVocData.filename] = {
                shapes : []
            }
        }
    },
    toPascalVOC : function(imgName){
        var image = labellingData[ imgName ];

        var exportData = `<?xml version="1.0"?>
<annotation>
    <folder>images</folder>
    <filename>${imgName}</filename>
    <path>images/${imgName}</path>
    <source>
        <database>Unknown</database>
    </source>
    <size>
        <width>${image.size.width}</width>
        <height>${image.size.height}</height>
        <depth>3</depth>
    </size>
    <segmented>0</segmented>`
        //Add images
        for(var shape_i = 0 ; shape_i < image.shapes.length; shape_i++){
            var shape = image.shapes[ shape_i ];
            exportData += `
    <object>
        <name>${shape.label}</name>
        <pose>Unspecified</pose>
        <truncated>0</truncated>
        <difficult>0</difficult>
        <bndbox>
            <xmin>${shape.bbox.x}</xmin>
            <ymin>${shape.bbox.y}</ymin>
            <xmax>${shape.bbox.x + shape.bbox.w}</xmax>
            <ymax>${shape.bbox.y + shape.bbox.h}</ymax>
        </bndbox>
    </object>`;
        }
        exportData += "\n</annotation>";

        return exportData;
    }

}

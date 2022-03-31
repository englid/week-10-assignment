function joint_plot(id, species, data) {

    let topId = id + "-top";
    let rightId = id + "-right";
    let mainId = id + "-main";
    let legendId = id + "-legend";

    let template = `<table class=joint-plot>
                        <tr>
                            <td><svg width="400px" height="100px"  id="${topId}"></svg></td>
                            <td><svg width="100px" height="100px"  id="${legendId}"></svg</td>
                        </tr>
                        <tr>
                            <td><svg width="400px" height="400px" viewBox="0 0 1000 1000" id="${mainId}"></svg></td>
                            <td><svg width="100px" height="400px" id="${rightId}"></svg></td>
                        </tr>
                    </table>`;

    document.getElementById(id).innerHTML = template;

    [topId, rightId, mainId, legendId].forEach(id => {
        d3.select(id)
        .append("g")
        .append('rect')
        .attr("class","fig")
        .attr("width","100%")
        .attr("height","100%");
    });

    let speciesData = data.filter(d => d.species === species);

    let culmen_length_mm = d3.map(speciesData, d => +d.culmen_length_mm);
    let culmen_depth_mm = d3.map(speciesData, d => +d.culmen_depth_mm);
    let flipper_length_mm = d3.map(speciesData, d => +d.flipper_length_mm);

    let islandCodes = {};
    let islands = Array.from(new Set(d3.map(speciesData, d => d.island)));
    islands.forEach((island, index) => {
        islandCodes[island] = index;
    });

    let species_Islands = d3.map(speciesData, (d) => islandCodes[d.island]);
    let colorScale = d3.scaleLinear().domain(d3.extent(species_Islands)).range(['steelblue','brown']);

    scatter_plot(culmen_length_mm,
        culmen_depth_mm,
        flipper_length_mm,
        species_Islands,
        colorScale,
        mainId,
        title=species + " Penguins",
        xLabel="Culmen Depth mm",
        yLabel="Culmen Length mm");
    
    bar_plot(culmen_length_mm, 10, topId);
    h_bar_plot(culmen_depth_mm,10, rightId);
    legend(legendId, islands, colorScale);
}
// delay
var transition_delay = 0;
var transition_duration = 320;

// canvas size 
var w = 800;
var h = 600;

d3.select("body")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "graph_canvas")
    .style("background-color", "aliceblue")

var appendData = function append(){

  // scaleX
  var scaleX = d3.scale.linear();
  var padding_left = 70;
  scaleX.domain([0, (w - padding_left) / 2])
  scaleX.range([0, (w - padding_left) / Math.max(3, dataset.length)])

  // x
  var bs_width = scaleX(40);
  var revenue_width = scaleX(50);
  var cashflow_width = scaleX(30);
  var padding_between_cashflows = scaleX(10);

  var padding_between_types = scaleX(28);
  var padding_between_data = scaleX(30);
  var data_width = (bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width * 3 + padding_between_cashflows * 2 + padding_between_data * 2);

  // y 
  var padding_bottom = 30;
  var padding_top = 50;
  
  // scaleY
  var scaleY = d3.scale.linear();
  // マイナスの最小値、もしくは0
  var domainMin = d3.min(dataset, function(d){ 
     return Math.min(0, d["equity"], d["operating_income"] , d["ibit"], d["net_income"], 
        (d["operation_cashflow"]), 
        (d["operation_cashflow"] + d["investment_cashflow"]), 
        (d["operation_cashflow"] + d["investment_cashflow"] + d["financing_cashflow"]) )
     }
  );
 
  // 最大値 
  var domainMax = d3.max(dataset, function(d){ 
     return Math.max(d["current_asset"] + 
        d["fixed_asset"], 
        d["revenue"], d["operating_income"] ,d["ibit"], d["net_income"],
        d["operation_cashflow"],
        d["operation_cashflow"] + d["investment_cashflow"],
        d["operation_cashflow"] + d["investment_cashflow"] + d["financing_cashflow"]
     )
  });

  // 0から最小〜最大までの幅
  scaleY.domain([0, domainMax - domainMin]);

  // 0から、padding領域を除いた上下幅内に割り当てる
  scaleY.range([0, h - padding_bottom - padding_top]);
  var eS = d3.select(".graph_canvas")
              .selectAll("rect")
              .data(dataset, function(d){return d.timestamp}).enter();

  // 描画ここから

  eS.append("rect").attr("class", "bound");
  eS.append("line").attr("class", "zero");
  eS.append("rect").attr("class", "fixed_asset").attr("data-display-name", "固定資産");
  eS.append("rect").attr("class", "current_asset").attr("data-display-name", "流動資産");
  eS.append("rect").attr("class", "long_term_liabilities").attr("data-display-name", "固定負債");
  eS.append("rect").attr("class", "short_term_liabilities").attr("data-display-name", "流動負債");
  eS.append("rect").attr("class", "equity").attr("data-display-name", "純資産");
  eS.append("rect").attr("class", "revenue").attr("data-display-name", "売上高");
  eS.append("rect").attr("class", "operating_income").attr("data-display-name", "営業利益");
  eS.append("rect").attr("class", "ibit").attr("data-display-name", "税引前当期純利益");
  eS.append("rect").attr("class", "net_income").attr("data-display-name", "当期純利益");
  eS.append("rect").attr("class", "operation_cashflow").attr("data-display-name", "営業キャッシュフロー");
  eS.append("rect").attr("class", "investment_cashflow").attr("data-display-name", "投資キャッシュフロー");
  eS.append("rect").attr("class", "financing_cashflow").attr("data-display-name", "財務キャッシュフロー");
  eS.append("line").attr("class", "o_to_f");
  eS.append("line").attr("class", "f_to_i");

  // Y axis
  var yAxis = d3.svg.axis();

  scaleAxis = d3.scale.linear();
  scaleAxis.domain([domainMin, domainMax]);
  scaleAxis.range([h - padding_bottom - padding_top, 0]);
  yAxis.scale(scaleAxis); 
  yAxis.orient("left")
       .ticks(8)
       .tickSize(10)
       .innerTickSize(10)
       .outerTickSize(0)
       .tickPadding(3)
  eS.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + padding_left + "," + padding_top + ")")
     .call(yAxis)
     .style("font", "14px 'Helvetica Neue'")

  // zero line
  d3.selectAll(".zero")
   .attr("stroke", "black")
   .attr("stroke-width", "0.5pt")
   .attr("fill", "none")
   .attr("x1", padding_left)
   .attr("x2", padding_left + data_width * 3)
   .attr("y1", h - padding_bottom + scaleY(domainMin))
   .attr("y2", h - padding_bottom + scaleY(domainMin))

  // tool tips
  $('rect' + ".fixed_asset, .current_asset, .long_term_liabilities, .short_term_liabilities, .equity, .revenue, .operating_income, .ibit, .net_income, .ibit, .net_income, .operation_cashflow, .investment_cashflow, .financing_cashflow").tipsy({ 
    gravity: 'w', 
    html: true, 
    title: function() {
      var d = this.__data__;
      return this.getAttribute("data-display-name")+": " + d[this.getAttribute("class")];
    }
  });

  // company name label
  eS.append("foreignObject")
      .attr("width", data_width)
      .attr("height", 1000)
      .style("font", "14px 'Helvetica Neue'")
      .attr("class", "label")
    .append("xhtml:body")
  d3.selectAll(".label")
      .attr("x", function(d, i){return padding_left + i * (data_width)} )
      .attr("y", padding_top * 0)
      .html(function(d){console.log(d); return d["name"] + "<br/>" + d["year"] + "年"})
      .style("text-align", "center")

  // boundary box
  d3.selectAll(".bound")
   .attr("fill", "grey") // temp
   .attr("fill-opacity", "0")
   .attr("stroke", "black")
   .attr("stroke-width", "0.3")
   .attr("x", function(d, i){return padding_left + i * (data_width);})
   .attr("width", data_width)
   .attr("y", function(d){return h - padding_bottom - scaleY(Math.abs(domainMax - domainMin));})
   .attr("height", Math.abs(scaleY(domainMin)) + Math.abs(scaleY(domainMax)))

  // statements
  d3.selectAll(".fixed_asset")
   .attr("fill", "lightskyblue")
   .attr("x", function(d, i){return padding_left + i * (data_width) + padding_between_data;})
   .attr("width", bs_width)
   .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
   .attr("y", function(d){return h - padding_bottom - scaleY(d["fixed_asset"] - domainMin);})
   .attr("height", function(d){return scaleY(d["fixed_asset"]);});

  d3.selectAll(".current_asset") 
   .attr("fill", "royalblue")
   .attr("x", function(d, i){return padding_left + i * (data_width) + padding_between_data;})
   .attr("width", bs_width)
   .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)              
   .attr("y", function(d){return h - padding_bottom - scaleY(d["fixed_asset"] + d["current_asset"] - domainMin) ;})
   .attr("height", function(d){return scaleY(d["current_asset"]);});


  d3.selectAll(".long_term_liabilities") 
   .attr("fill", "lightpink")
   .attr("x", function(d, i){return padding_left + i * (data_width) + bs_width + padding_between_data;})
   .attr("width", bs_width)
   .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)             
   .attr("y", function(d){return h - padding_bottom- scaleY( Math.max(0, d["equity"]) + d["long_term_liabilities"] - domainMin) ;})
   .attr("height", function(d){return scaleY(d["long_term_liabilities"]);});
 
  d3.selectAll(".short_term_liabilities")
     .attr("fill", "tomato")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width + padding_between_data;})
     .attr("width", bs_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){return h - padding_bottom - scaleY( Math.max(0, d["equity"]) + d["long_term_liabilities"] + d["short_term_liabilities"] - domainMin);})
     .attr("height", function(d){return scaleY(d["short_term_liabilities"]);});
  
  d3.selectAll(".equity")
     .attr("fill", "lightgreen")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width + padding_between_data;})
     .attr("width", bs_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){return h - padding_bottom - scaleY(Math.max(d["equity"], 0) - domainMin) ;})
     .attr("height", function(d){return scaleY(Math.abs(d["equity"]));});
  
  d3.selectAll(".revenue")
     .attr("fill", "gold")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + padding_between_data;})
     .attr("width", revenue_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
  
     .attr("y", function(d){return h - padding_bottom - scaleY(d["revenue"] - domainMin);})
     .attr("height", function(d){return scaleY(d["revenue"]);})
 
  d3.selectAll(".operating_income")
     .attr("fill", "greenyellow")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + padding_between_data;})
     .attr("width", revenue_width * 0.8)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){return h - padding_bottom + scaleY(domainMin) - Math.max(0, scaleY(d["operating_income"])) ;})
     .attr("height", function(d){return Math.abs(scaleY(d["operating_income"]));});               
  
  d3.selectAll(".ibit")
     .attr("fill", "limegreen")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + padding_between_data;})
     .attr("width", revenue_width * 0.5)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){return  h - padding_bottom + scaleY(domainMin) - Math.max(0, scaleY(d["ibit"]));})
     .attr("height", function(d){return Math.abs(scaleY(d["ibit"]));});
  
  d3.selectAll(".net_income")
     .attr("fill", "lime")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + padding_between_data;})
     .attr("width", revenue_width * 0.3)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){return  h - padding_bottom + scaleY(domainMin) - Math.max(0, scaleY(d["net_income"]));})
     .attr("height", function(d){return Math.abs(scaleY(d["net_income"]));});
  
  
  d3.selectAll(".operation_cashflow")
     .attr("fill", "#38849A") 
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + padding_between_data;})
     .attr("width", cashflow_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){
        return h - padding_bottom + scaleY(domainMin) - scaleY( Math.max(0, d["operation_cashflow"]));
     })
     .attr("height", function(d){return scaleY( Math.abs(d["operation_cashflow"]));});
  
  
  d3.selectAll(".investment_cashflow")
     .attr("fill", "#A86780")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + padding_between_data;})
     .attr("width", cashflow_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){
        return h - padding_bottom + scaleY(domainMin)
              - scaleY( d["operation_cashflow"])
              - scaleY( Math.max(0, d["investment_cashflow"]));
     })
     .attr("height", function(d){return scaleY( Math.abs(d["investment_cashflow"]));});
 
 
  d3.selectAll(".financing_cashflow")
     .attr("fill", "#ADB853")
     .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + 2 *( cashflow_width + padding_between_cashflows) + padding_between_data;})
     .attr("width", cashflow_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){
        return h - padding_bottom + scaleY(domainMin)
              - scaleY( d["operation_cashflow"])
              - scaleY( d["investment_cashflow"])
              - scaleY( Math.max(0, d["financing_cashflow"]));
     })
     .attr("height", function(d){return scaleY( Math.abs(d["financing_cashflow"]));});

  d3.selectAll(".o_to_f")
     .attr("x1", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_data;})
     .attr("x2", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + padding_between_data;})
     .attr("y1", function(d){ return h - padding_bottom + scaleY(domainMin); })
     .attr("y2", function(d){ return h - padding_bottom + scaleY(domainMin);})
     .transition().delay(transition_delay).duration(transition_duration)
     .attr("stroke", "black")
     .attr("stroke-width", "0.5pt")
     .attr("stroke-dasharray", "0.2, 0.2")
     .attr("fill", "none")
     .attr("x1", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_data;})
     .attr("x2", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + padding_between_data;})
     .attr("y1", function(d){
        return h - padding_bottom + scaleY(domainMin)
              - scaleY( d["operation_cashflow"]);
     })
     .attr("y2", function(d){
        return h - padding_bottom + scaleY(domainMin)
              - scaleY( d["operation_cashflow"]);
     })
  
  d3.selectAll(".f_to_i")
     .attr("x1", function(d, i){return padding_left + i * (data_width) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + cashflow_width + padding_between_data;})
     .attr("x2", function(d, i){return padding_left + i * (data_width) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + cashflow_width + padding_between_cashflows + padding_between_data;})
     .attr("y1", function(d){
        return h - padding_bottom + scaleY(domainMin)
     })
     .attr("y2", function(d){
        return h - padding_bottom + scaleY(domainMin)
     })
     .transition().delay(transition_delay).duration(transition_duration)
     .attr("stroke", "black")
     .attr("stroke-width", "0.5pt")
     .attr("stroke-dasharray", "0.2, 0.2")
     .attr("fill", "none")
     .attr("x1", function(d, i){return padding_left + i * (data_width) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + cashflow_width + padding_between_data;})
     .attr("x2", function(d, i){return padding_left + i * (data_width) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + cashflow_width + padding_between_cashflows + padding_between_data;})
     .attr("y1", function(d){
        return h - padding_bottom + scaleY(domainMin)
              - scaleY( d["operation_cashflow"])
              - scaleY( d["investment_cashflow"]);
     })
     .attr("y2", function(d){
        return h - padding_bottom + scaleY(domainMin)
              - scaleY( d["operation_cashflow"])
              - scaleY( d["investment_cashflow"]);
     })
}


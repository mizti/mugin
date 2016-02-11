$(document).ready(function(){
  var dataset = //[];

[
  { 
     "ticker": "ccs", 
     "name": "cheese cake shop",
     "year": "2014", 
     "fixed_asset":10000,
     "current_asset":15000,
     "equity": -5000,
     "long-term_liabilities":8000,
     "short-term_liabilities":17000,
     "revenue":40000,
     "operating_income":15000,
     "ibit":10000,
     "net_income":3500,
     "operation_cashflow":-3000,
     "financing_cashflow":5000,
     "investment_cashflow": 3000
  },
  { 
     "ticker": "ccs", 
     "name": "cheese cake shop",
     "year": "2015", 
     "fixed_asset":30000,
     "current_asset":20000,
     "equity":35000,
     "long-term_liabilities":8000,
     "short-term_liabilities":7000,
     "revenue":30000,
     "operating_income":15000,
     "ibit":10000,
     "net_income":3500,
     "operation_cashflow":5800,
     "financing_cashflow":5500,
     "investment_cashflow": -2000
  }            
];
            var w = 1000;
            var h = 600;

            var svg = d3.select("body")
                        .append("svg")
                          .attr("width", w)
                          .attr("height", h);
            // delay
            var transition_delay = 100;
            var transition_duration = 380;

            // scaleX
            var scaleX = d3.scale.linear();
            scaleX.domain([0, w / 2])
            scaleX.range([0, w / Math.max(2, dataset.length)])

            // X
            var padding_left = scaleX(20);
            var bs_width = scaleX(30);
            var revenue_width = scaleX(40);
            var cashflow_width = scaleX(25);
            var padding_between_cashflows = scaleX(10);

            var padding_between_types = scaleX(15);
            var padding_between_data = scaleX(20);
            var data_width = (bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width * 3 + padding_between_cashflows * 2 + padding_between_data);

            // Y
            var padding_bottom = 30;
            var padding_top = 210;

            // scaleY
            var scaleY = d3.scale.linear();

            var domainMin = d3.min(dataset, function(d){ 
               return Math.min(0, d["equity"], d["operating_income"] , d["ibit"], d["net_income"], 
               (d["operation_cashflow"]), 
               (d["operation_cashflow"] + d["financing_cashflow"]), 
               (d["operation_cashflow"] + d["financing_cashflow"] + d["investment_cashflow"]) )
            });

            var domainMax = d3.max(dataset, function(d){ return Math.max(d["current_asset"] + d["fixed_asset"], d["revenue"], d["operating_income"] ,d["ibit"], d["net_income"])});

            scaleY.domain([0, domainMax - domainMin]);
            scaleY.range([0, h - padding_bottom - padding_top]);

  

  d3.select("body")
    .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "graph_canvas")

  appendData();

  function appendData(){
    var eS = d3.select(".graph_canvas")
                .selectAll("rect")
                .data(dataset, function(d){return d.ticker + d.year}).enter();
  
    eS.append("line").attr("class", "zero");
    eS.append("rect").attr("class", "fixed_asset");
    eS.append("rect").attr("class", "current_asset");
    eS.append("rect").attr("class", "long-term_liabilities");
    eS.append("rect").attr("class", "short-term_liabilities");
    eS.append("rect").attr("class", "equity");
    eS.append("rect").attr("class", "revenue");
    eS.append("rect").attr("class", "operating_income");
    eS.append("rect").attr("class", "ibit");
    eS.append("rect").attr("class", "net_income");
    eS.append("rect").attr("class", "operation_cashflow");
    eS.append("rect").attr("class", "financing_cashflow");
    eS.append("rect").attr("class", "investment_cashflow");
    eS.append("line").attr("class", "o_to_f");
    eS.append("line").attr("class", "f_to_i");
    
    d3.selectAll(".zero")
     .attr("stroke", "black")
     .attr("stroke-width", "0.5pt")
     .attr("fill", "none")
     .attr("x1", function(d, i){return padding_left + 0.9 * i * (data_width);})
     .attr("x2", function(d, i){return padding_left + (i + 1 )* (data_width);})
     .attr("y1", function(d){
        return h - padding_bottom + scaleY(domainMin);
     })
     .attr("y2", function(d){
        return h - padding_bottom + scaleY(domainMin);
     })
  
    d3.selectAll(".fixed_asset")
     .attr("fill", "lightskyblue")
     .attr("x", function(d, i){return padding_left + i * (data_width );})
     .attr("width", bs_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
     .attr("y", function(d){return h - padding_bottom - scaleY(d["fixed_asset"] - domainMin);})
     .attr("height", function(d){return scaleY(d["fixed_asset"]);});
  
    d3.selectAll(".current_asset") 
     .attr("fill", "royalblue")
     .attr("x", function(d, i){return padding_left + i * (data_width );})
     .attr("width", bs_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)              
     .attr("y", function(d){return h - padding_bottom - scaleY(d["fixed_asset"] + d["current_asset"] - domainMin) ;})
     .attr("height", function(d){return scaleY(d["current_asset"]);});
  
    d3.selectAll(".long-term_liabilities") 
     .attr("fill", "lightpink")
     .attr("x", function(d, i){return padding_left + i * (data_width) + bs_width;})
     .attr("width", bs_width)
     .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)             
     .attr("y", function(d){return h - padding_bottom- scaleY( Math.max(0, d["equity"]) + d["long-term_liabilities"] - domainMin) ;})
     .attr("height", function(d){return scaleY(d["long-term_liabilities"]);});
   
    d3.selectAll(".short-term_liabilities")
       .attr("fill", "tomato")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width;})
       .attr("width", bs_width)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){return h - padding_bottom - scaleY( Math.max(0, d["equity"]) + d["long-term_liabilities"] + d["short-term_liabilities"] - domainMin);})
       .attr("height", function(d){return scaleY(d["short-term_liabilities"]);});
    
    d3.selectAll(".equity")
       .attr("fill", "lightgreen")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width;})
       .attr("width", bs_width)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){return h - padding_bottom - scaleY(Math.max(d["equity"], 0) - domainMin) ;})
       .attr("height", function(d){
          console.log(Math.abs(d["equity"]));
          console.log(scaleY(Math.abs(d["equity"])));
          return scaleY(Math.abs(d["equity"]));});
    
    d3.selectAll(".revenue")
       .attr("fill", "gold")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types;})
       .attr("width", revenue_width)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
    
       .attr("y", function(d){return h - padding_bottom - scaleY(d["revenue"] - domainMin);})
       .attr("height", function(d){return scaleY(d["revenue"]);});               
    
    d3.selectAll(".operating_income")
       .attr("fill", "greenyellow")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types;})
       .attr("width", revenue_width * 0.8)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){return h - padding_bottom - scaleY(d["operating_income"] - domainMin) ;})
       .attr("height", function(d){return scaleY(d["operating_income"]);});               
    
    d3.selectAll(".ibit")
       .attr("fill", "limegreen")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types;})
       .attr("width", revenue_width * 0.5)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){return h - padding_bottom- scaleY(d["ibit"] - domainMin);})
       .attr("height", function(d){return scaleY(d["ibit"]);});
    
    d3.selectAll(".net_income")
       .attr("fill", "lime")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types;})
       .attr("width", revenue_width * 0.3)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){return h - padding_bottom -scaleY(d["net_income"] - domainMin);})
       .attr("height", function(d){return scaleY(d["net_income"]);});
    
    
    d3.selectAll(".operation_cashflow")
       .attr("fill", "#38849A") //#A86780 #ADB853
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types;})
       .attr("width", cashflow_width)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){
          return h - padding_bottom + scaleY(domainMin) - scaleY( Math.max(0, d["operation_cashflow"]));
       })
       .attr("height", function(d){return scaleY( Math.abs(d["operation_cashflow"]));});
    
    
    d3.selectAll(".financing_cashflow")
       .attr("fill", "#A86780")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows;})
       .attr("width", cashflow_width)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){
          return h - padding_bottom + scaleY(domainMin)
                - scaleY( d["operation_cashflow"])
                - scaleY( Math.max(0, d["financing_cashflow"]));
       })
       .attr("height", function(d){return scaleY( Math.abs(d["financing_cashflow"]));});
   
   
    d3.selectAll(".investment_cashflow")
       .attr("fill", "#ADB853")
       .attr("x", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + 2 *( cashflow_width + padding_between_cashflows);})
       .attr("width", cashflow_width)
       .attr("height", 0).attr("y", function(d){return h - padding_bottom + scaleY(domainMin);}).transition().delay(transition_delay).duration(transition_duration)
       .attr("y", function(d){
          return h - padding_bottom + scaleY(domainMin)
                - scaleY( d["operation_cashflow"])
                - scaleY( d["financing_cashflow"]);
       })
       .attr("height", function(d){return scaleY( Math.abs(d["investment_cashflow"]));});
  
    
    d3.selectAll(".o_to_f")
       .transition().delay(transition_delay + transition_duration - 30)
       .attr("stroke", "black")
       .attr("stroke-width", "0.5pt")
       .attr("stroke-dasharray", "0.2, 0.2")
       .attr("fill", "none")
       .attr("x1", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width;})
       .attr("x2", function(d, i){return padding_left + i * (data_width ) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows;})
       .attr("y1", function(d){
          return h - padding_bottom + scaleY(domainMin)
                - scaleY( d["operation_cashflow"]);
       })
       .attr("y2", function(d){
          return h - padding_bottom + scaleY(domainMin)
                - scaleY( d["operation_cashflow"]);
       })
    
    d3.selectAll(".f_to_i")
       .transition().delay(transition_delay + transition_duration - 30)
       .attr("stroke", "black")
       .attr("stroke-width", "0.5pt")
       .attr("stroke-dasharray", "0.2, 0.2")
       .attr("fill", "none")
       .attr("x1", function(d, i){return padding_left + i * (data_width) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + cashflow_width;})
       .attr("x2", function(d, i){return padding_left + i * (data_width) + bs_width * 2 + padding_between_types + revenue_width + padding_between_types + cashflow_width + padding_between_cashflows + cashflow_width + padding_between_cashflows;})
       .attr("y1", function(d){
          return h - padding_bottom + scaleY(domainMin)
                - scaleY( d["operation_cashflow"])
                - scaleY( d["financing_cashflow"]);
       })
       .attr("y2", function(d){
          return h - padding_bottom + scaleY(domainMin)
                - scaleY( d["operation_cashflow"])
                - scaleY( d["financing_cashflow"]);
       })
  }

  dataset.push({
     "ticker": "ccs",             
     "name": "cheese cake shop",
     "year": "2016",
     "fixed_asset":30000,
     "current_asset":20000,
     "equity":35000,
     "long-term_liabilities":8000,
     "short-term_liabilities":7000,
     "revenue":60000,
     "operating_income":15000,
     "ibit":10000,
     "net_income":3500,
     "operation_cashflow":5800,
     "financing_cashflow":5500,
     "investment_cashflow": -2000
  })
	var huga = 0;
	var hoge = setInterval(function() {
	    console.log(huga);
	    huga++;
	    //終了条件
	    if (huga == 4) {
	    clearInterval(hoge);
	    console.log("終わり");
  	    appendData();
	    }
	}, 500);

});

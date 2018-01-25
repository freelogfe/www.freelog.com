//https://stackoverflow.com/questions/16058073/how-do-i-draw-a-graph-or-tree-structure-in-javascript
//http://bl.ocks.org/rkirsling/5001347
// https://bl.ocks.org/cjrd/6863459
//https://bl.ocks.org/curran/5905182da50a4667dc00
// https://bl.ocks.org/mbostock/1138500
function DirectGraph(opts) {
  opts = opts || {}
  var width = opts.width || 960,
    height = opts.height || 500,
    colors = d3.scale.category10();
  var Radius = opts.radius || 20;

  var self = this;
  var $svg;
  var $container = (typeof opts.container === 'string') ? document.querySelector(opts.container) : opts.container;
  this._opts = opts

  if (opts.container) {
    $svg = d3.select(opts.container)
  } else {
    $svg = d3.select("body").append("svg")
    opts.container = $svg
  }
  $svg.attr('width', width)
    .attr('height', height);

  var $tip = opts.$tip || $container.parentNode.querySelector('.js-svg-tip')
  if (!$tip) {
    $tip = document.createElement('div')
    $tip.classList.add('tip')
    $container.parentNode.appendChild($tip)
  }
  var nodes = [];
  var links = [];

// init D3 force layout
  var force = d3.layout.force()
    .size([width, height])
    .linkDistance(150)
    .charge(-500)
    .on('tick', tick)

// define arrow markers for graph links
  $svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

  $svg.append('svg:defs').append('svg:marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 4)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M10,-5L0,0L10,5')
    .attr('fill', '#000');

  // handles to link and node element groups
  var path = $svg.append('svg:g').attr('class', 'state-link').selectAll('path'),
    circle = $svg.append('svg:g').selectAll('g');
  var actions = $svg.append("svg:g").attr('class', 'state-step').selectAll("g")

// update force layout (called automatically each iteration)
  function tick() {
    // draw directed edges with proper padding from node centers
    path.attr('d', function (d) {
      var deltaX = d.target.x - d.source.x,
        deltaY = d.target.y - d.source.y,
        dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        normX = deltaX / dist,
        normY = deltaY / dist,
        sourcePadding = d.left ? 17 : 12,
        targetPadding = d.right ? 17 : 12,
        sourceX = d.source.x + (sourcePadding * normX),
        sourceY = d.source.y + (sourcePadding * normY),
        targetX = d.target.x - (targetPadding * normX),
        targetY = d.target.y - (targetPadding * normY);
      return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
    });
    actions.attr("transform", function (d) {
      return "translate(" + ((d.target.x + d.source.x) / 2) + "," +
        ((d.target.y + d.source.y)) / 2 + ")";
    })

    circle.attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });
  }

  function autoPlacementTip(pos, diff) {
    var parentRect = opts.container.parentNode.getBoundingClientRect()
    var conRect = opts.container.getBoundingClientRect()
    var diffx = conRect.x - parentRect.x,
      diffy = conRect.y - parentRect.y;
    var tipRect = $tip.getBoundingClientRect()
    diff = diff || {
      x: 0,
      y: 0
    }
    var posx = diffx + pos.x
    var posy = diffy + pos.y

    if (posx + tipRect.width > conRect.width) {
      posx -= tipRect.width + diff.x
    }

    if (posy + tipRect.height > conRect.height) {
      posy -= tipRect.height + diff.y
    }
    $tip.style.left = posx + 'px'
    $tip.style.top = posy + 'px'
  }


  function drawPath() {
    // path (link) group
    path = path.data(links);

    // update existing links
    path.style('marker-start', function (d) {
      return d.left ? 'url(#start-arrow)' : '';
    }).style('marker-end', function (d) {
      return d.right ? 'url(#end-arrow)' : '';
    });


    // add new links
    path.enter().append('svg:path')
      .attr('class', function (d) {
        return d.source.data.stateClass + ' link'
      })
      .style('marker-start', function (d) {
        return d.left ? 'url(#start-arrow)' : '';
      })
      .style('marker-end', function (d) {
        return d.right ? 'url(#end-arrow)' : '';
      })

    // remove old links
    path.exit().remove();
  }

  function drawMiddleSteps() {
    actions = actions.data(links);
    var fo = actions.enter().append("foreignObject")
      .attr({
        'x': -20,
        'y': -10,
        'width': 30,
        height: 30,
        // 'class': 'step-tip-wrap'
      })
    var $div = fo.append("xhtml:div")
      .attr('class', 'step-tip-wrap')
      .on('mouseenter', function (p) {
        var pos = d3.transform(d3.select(this.parentNode).attr("transform")).translate// d3.mouse(this)

        $tip.style.opacity = 1
        if (self._opts.overlayHandler) {
          self._opts.overlayHandler(p, $tip)
          setTimeout(autoPlacementTip({x: pos[0] + 30, y: pos[1]}, {
            x: 30
          }), 20)
        }
      })
    // .on('mouseout', function (p) {
    //   $tip.style.opacity = 0
    // })

    $div.append('div')
      .attr({
        'class': 'tooltip'
      }).html('<i class="el-icon-info"></i>')
      .attr('class', function (d) {
        return 'action-btn'
      })
    // $div.append('div')
    //   .attr('class', 'tip-content')
    //   .html(`<p>hello</p>`)

    actions.exit().remove();
  }

  function drawCircles() {

    // circle (node) group
    // NB: the function arg is crucial here! nodes are known by id, not by index!
    circle = circle.data(nodes, function (d) {
      return d.id;
    });

    // update existing nodes (reflexive & selected visual states)
    circle.selectAll('circle')
      .classed('reflexive', function (d) {
        return d.reflexive;
      });

    // add new nodes
    var g = circle.enter().append('svg:g');
    g.append('svg:circle')
      .attr('class', function (d) {
        return 'node ' + (d.data.stateClass || '')
      })
      .attr('r', Radius)
      .on('mouseenter', function (d) {
        $tip.style.opacity = 1
        var pos = d3.transform(d3.select(this.parentNode).attr("transform")).translate// d3.mouse(this)

        if (self._opts.overlayHandler) {
          self._opts.overlayHandler(d.data, $tip)
          setTimeout(autoPlacementTip({x: pos[0] + 40, y: pos[1]}, {x: 40}), 20)
        }
      })

    // show node IDs
    // g.append('svg:text')
    //     .attr('x', 0)
    //     .attr('y', 4)
    //     .attr('class', 'id')
    //     .text(function (d) {
    //         // return d.data.state
    //         return d.id;
    //     });

    // remove old nodes
    circle.exit().remove();
  }

  //selected变虚线
  function restart() {

    drawMiddleSteps()
    drawPath();
    drawCircles()
    // set the graph in motion
    force.start();
  }

  opts.nodes.forEach(function (node) {
    nodes.push(node);
    restart();
  })

  opts.links.forEach(function (link) {
    links.push(link);
    restart();
  })
  return this
}


export default DirectGraph


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
    }
    $svg.attr('width', width)
        .attr('height', height);

    var $tip = $container.parentNode.querySelector('.js-svg-tip')
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

    var selected_link
// handles to link and node element groups
    var path = $svg.append('svg:g').selectAll('path'),
        circle = $svg.append('svg:g').selectAll('g');
    var showPathTip = false

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

        circle.attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
    }

    //selected变虚线
    function restart() {
        // path (link) group
        path = path.data(links);

        // update existing links
        path.style('marker-start', function (d) {
            return d.left ? 'url(#start-arrow)' : '';
        })
            .style('marker-end', function (d) {
                return d.right ? 'url(#end-arrow)' : '';
            });


        // add new links
        path.enter().append('svg:path')
            .attr('class', 'link')
            .style('marker-start', function (d) {
                return d.left ? 'url(#start-arrow)' : '';
            })
            .style('marker-end', function (d) {
                return d.right ? 'url(#end-arrow)' : '';
            })
            .on('click', function (p) {
                var src = p.source;
                var target = p.target
                var pos = d3.mouse(this)

                selected_link = this
                showPathTip = true
                $tip.style.opacity = 1
                $tip.style.top = pos[1] + 'px'
                $tip.style.left = pos[0] + 'px'
                // this.classList.add('selected')
                if (self._opts.overlayHandler) {
                    // self._opts.overlayHandler(p)
                    $tip.innerHTML = self._opts.overlayHandler(p)
                } else {
                    $tip.innerHTML = JSON.stringify({
                        source: src.data.state,
                        target: target.data.state
                    })
                }
            })

        // remove old links
        path.exit().remove();

        // circle (node) group
        // NB: the function arg is crucial here! nodes are known by id, not by index!
        circle = circle.data(nodes, function (d) {
            return d.id;
        });

        // update existing nodes (reflexive & selected visual states)
        circle.selectAll('circle')
            .style('fill', function (d) {
                return colors(d.id);
            })
            .classed('reflexive', function (d) {
                return d.reflexive;
            });

        // add new nodes
        var g = circle.enter().append('svg:g');
        g.append('svg:circle')
            .attr('class', 'node')
            .attr('r', Radius)
            .style('fill', function (d) {
                return colors(d.id);
            })
            .style('stroke', function (d) {
                return d3.rgb(colors(d.id)).darker().toString();
            })
            .classed('reflexive', function (d) {
                return d.reflexive;
            })
            .on('click', function (d) {
                // console.log(d)
                $tip.style.display = 'block'
                $tip.style.opacity = 1
                $tip.style.top = (d.y - Radius) + 'px'
                $tip.style.left = (d.x + Radius * 1.5) + 'px'
                if (self._opts.overlayHandler) {
                    $tip.innerHTML = self._opts.overlayHandler(d.data)
                } else {
                    $tip.innerHTML = JSON.stringify(d.data)
                }
            })

        // show node IDs
        g.append('svg:text')
            .attr('x', 0)
            .attr('y', 4)
            .attr('class', 'id')
            .text(function (d) {
                console.log(d)
                // return d.data.state
                return d.id;
            });

        // remove old nodes
        circle.exit().remove();

        // set the graph in motion
        force.start();
    }

// only respond once per keydown
    this.linkNodes = function (node1, node2) {
        var source, target, direction;
        var srcNode = node1
        var targetNode = node2
        if (srcNode.id < targetNode.id) {
            source = srcNode;
            target = targetNode;
            direction = 'right';
        } else {
            source = targetNode;
            target = srcNode;
            direction = 'left';
        }

        var link;
        link = links.filter(function (l) {
            return (l.source === source && l.target === target);
        })[0];

        if (link) {
            link[direction] = true;
        } else {
            link = {source: source, target: target, left: false, right: false};
            link[direction] = true;
            links.push(link);
        }

        restart();
    }

    // $svg.on('click', function () {
    //     if (!showPathTip) {
    //         $tip.style.opacity = 0
    //         selected_link && selected_link.classList.remove('selected')
    //     }
    //     showPathTip = false
    // });

    opts.nodes.forEach(function (node) {
        // $svg.classed('active', true);
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


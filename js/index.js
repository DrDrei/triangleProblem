var col = {
  a: 'A',
  b: 'B',
  c: 'C'
}

var indexArray = [];

function ListItem(index) {  
  this.obj = {
    color: null,
    index: index,
    linkedItems: []
  };
  this.potentialColors = [col.a, col.b, col.c];
  this.valuesToIterate = [];

  this.addLink = function(index) {
    this.obj.linkedItems.push(index);
  }

  this.setColor = function(color) {
    this.obj.color = color;
    this.potentialColors = [];
  }
}

(function init() {
  // generate the all the nodes with indecies.
  var nodes = [];
  for (var i = 0; i < 22; i++) {
    var item = new ListItem(i);
    nodes.push(item);
    indexArray.push(i);
  }

  // add the outside predefined colors
  nodes[0].setColor(col.a);
  nodes[1].setColor(col.a);
  nodes[2].setColor(col.c);
  nodes[3].setColor(col.b);
  nodes[4].setColor(col.a);
  nodes[5].setColor(col.c);
  nodes[6].setColor(col.b);
  nodes[7].setColor(col.a);
  nodes[8].setColor(col.a);
  nodes[9].setColor(col.c);
  nodes[10].setColor(col.b);

  // Add all the links
  nodes[0].addLink(1);
  nodes[0].addLink(10);
  nodes[0].addLink(11);

  nodes[1].addLink(0);
  nodes[1].addLink(2);
  nodes[1].addLink(11);
  nodes[1].addLink(12);

  nodes[2].addLink(1);
  nodes[2].addLink(3);
  nodes[2].addLink(12);
  nodes[2].addLink(13);

  nodes[3].addLink(2);
  nodes[3].addLink(4);
  nodes[3].addLink(13);

  nodes[4].addLink(3);
  nodes[4].addLink(5);
  nodes[4].addLink(13);
  nodes[4].addLink(14);
  nodes[4].addLink(21);

  nodes[5].addLink(4);
  nodes[5].addLink(6);
  nodes[5].addLink(14);
  nodes[5].addLink(15);

  nodes[6].addLink(5);
  nodes[6].addLink(7);
  nodes[6].addLink(15);

  nodes[7].addLink(6);
  nodes[7].addLink(8);
  nodes[7].addLink(15);
  nodes[7].addLink(16);

  nodes[8].addLink(7);
  nodes[8].addLink(9);
  nodes[8].addLink(16);
  nodes[8].addLink(17);

  nodes[9].addLink(8);
  nodes[9].addLink(10);
  nodes[9].addLink(17);
  nodes[9].addLink(18);
  nodes[9].addLink(19);

  nodes[10].addLink(0);
  nodes[10].addLink(9);
  nodes[10].addLink(11);
  nodes[10].addLink(18);

  nodes[11].addLink(0);
  nodes[11].addLink(1);
  nodes[11].addLink(10);
  nodes[11].addLink(12);
  nodes[11].addLink(18);

  nodes[12].addLink(1);
  nodes[12].addLink(2);
  nodes[12].addLink(11);
  nodes[12].addLink(13);
  nodes[12].addLink(18);
  nodes[12].addLink(20);
  nodes[12].addLink(21);

  nodes[13].addLink(2);
  nodes[13].addLink(3);
  nodes[13].addLink(4);
  nodes[13].addLink(12);
  nodes[13].addLink(21);

  nodes[14].addLink(4);
  nodes[14].addLink(5);
  nodes[14].addLink(15);
  nodes[14].addLink(21);

  nodes[15].addLink(5);
  nodes[15].addLink(6);
  nodes[15].addLink(7);
  nodes[15].addLink(14);
  nodes[15].addLink(16);
  nodes[15].addLink(21);

  nodes[16].addLink(7);
  nodes[16].addLink(8);
  nodes[16].addLink(15);
  nodes[16].addLink(17);
  nodes[16].addLink(20);
  nodes[16].addLink(21);

  nodes[17].addLink(8);
  nodes[17].addLink(9);
  nodes[17].addLink(16);
  nodes[17].addLink(19);
  nodes[17].addLink(20);

  nodes[18].addLink(9);
  nodes[18].addLink(10);
  nodes[18].addLink(11);
  nodes[18].addLink(12);
  nodes[18].addLink(19);
  nodes[18].addLink(20);

  nodes[19].addLink(9);
  nodes[19].addLink(17);
  nodes[19].addLink(18);
  nodes[19].addLink(20);

  nodes[20].addLink(12);
  nodes[20].addLink(16);
  nodes[20].addLink(17);
  nodes[20].addLink(18);
  nodes[20].addLink(19);
  nodes[20].addLink(21);

  nodes[21].addLink(4);
  nodes[21].addLink(12);
  nodes[21].addLink(13);
  nodes[21].addLink(14);
  nodes[21].addLink(15);
  nodes[21].addLink(16);
  nodes[21].addLink(20);

  // update a few times to get the colors for some of the inner nodes that have only one solution... like nodes 13 and 15 (on first iteration).
  updateTriangles(false); 
  updateTriangles(false);
  updateTriangles(false); 
  // running up to here, give me 100% chance of forming two triangles at nodes 18 and 21.
  
  // manually checking 18 and 21 i could see that node 17 was the only node that ran out of colors, so it had to form at least one more triangle. Including node 17 in the loop, you can see all the posible combinations for nodes 11-21 in the console.
  var potentialCombinations = 0;
  for (var color18 in col) {
    nodes[18].obj.color = col[color18]; 
    updateTriangles(false); 
    for (var color21 in col) {
      nodes[21].obj.color = col[color21]; 
      updateTriangles(false); 
      for (var color17 in col) {
        nodes[17].obj.color = col[color17]; 
        updateTriangles(false); 
        if (checkNumTriangles() <= 3) {
          printColors(); 
          potentialCombinations++;
        };   
      }
    }
  }
  console.log(potentialCombinations)
  
  // Prints all the colors into console (in an array fashion)
  function printColors() {
    var colors = [];
    for (var i = 11; i < nodes.length; i++) {
      colors.push(nodes[i].obj.color);
    }
    console.log(colors);
  }
  
  // runs through all the non-defined nodes, and tries to find a color that won't form a tri-color triangle. also has some debugging messages.
  function updateTriangles(bool) {
    for (var i = 11; i < 22; i++) {
      getPossibleColors(i);
      if (bool) {
        if (nodes[i].obj.color === null) {
          console.log('Colors to iterate for '+i+' is '+ nodes[i].valuesToIterate);
          console.log('Potential colors for '+i+' is '+ nodes[i].potentialColors);
        } else { 
          console.log('Set color for '+i+' is '+ nodes[i].obj.color);
        } 
      }
    } 
  }
  
  // Checks the number of tri-color trianlges that have been formed. Runs through each node and tests the adjacent colors... since we have 3 nodes per trianlge, it was simple enough to divide the count by 3 and get the number of said triangles rather than mess around with removing links from nodes (as i originally tried to do)
  function checkNumTriangles() {
    var checkNodes = nodes.slice();
    var count = 0;
    var emptyNodes = [];
    for (var nodeIndex = 0; nodeIndex < 22; nodeIndex++) {
      if (checkNodes[nodeIndex].obj.color === null) {
        emptyNodes.push(nodeIndex);
      }
      for (var i = 0; i < checkNodes[nodeIndex].obj.linkedItems.length - 1; i++) {
        var ind1 = nodes[nodeIndex].obj.linkedItems[i];
        for (var j = i+1; j < checkNodes[nodeIndex].obj.linkedItems.length; j++) {
          var ind2 = nodes[nodeIndex].obj.linkedItems[j];
          if (checkTriangle(ind1, ind2)) {
            if (isTriangle(nodeIndex, ind1, ind2)) {
              count++;
            }
          }
        }
      }
    } 
    // console.log('there are '+count/3+ ' triangles and ' + emptyNodes + ' empty nodes.')
    if (emptyNodes.length > 0) {
      return 20;
    }
    return count/3;
  }
  
  // checks if the the three nodes that are passed into it form a tri-color triangle.
  function isTriangle(nodeIndex, ind2, ind3) {
    var color1 = nodes[nodeIndex].obj.color; 
    var color2 = nodes[ind2].obj.color; 
    var color3 = nodes[ind3].obj.color;

    if (color1 !== color2 && 
        color1 !== color3 && 
        color2 != color3 && 
        color1 !== null && 
        color2 !== null && 
        color3 !== null) {
      return true;
    }
    return false;
  }

  // this function iterates through all the nodes neighbors and updates it's potential color list. Also, if there's only one potential color left, it makes it that nodes color. and if it runs out of potential colors and it doesn't have a color itself, that means that a tri-color trianlge MUST be formed somewhere around that node.
  function getPossibleColors(nodeIndex) {
    for (var i = 0; i < nodes[nodeIndex].obj.linkedItems.length - 1; i++) {
      var ind1 = nodes[nodeIndex].obj.linkedItems[i];
      for (var j = i+1; j < nodes[nodeIndex].obj.linkedItems.length; j++) {
        var ind2 = nodes[nodeIndex].obj.linkedItems[j];
        if (checkTriangle(ind1, ind2)) {
          if (checkColors(ind1, ind2)) {
            updatePotentialColors(nodeIndex, ind1, ind2);
          }
        }
      }
    }
    if (nodes[nodeIndex].potentialColors.length == 1) {
      nodes[nodeIndex].obj.color = nodes[nodeIndex].potentialColors[0];
      return true;
    }
    if (nodes[nodeIndex].potentialColors.length === 0 && 
        nodes[nodeIndex].obj.color === null) {
      nodes[nodeIndex].valuesToIterate = [col.a, col.b, col.c];
      return true;
    }
    return false;
  }

  // Check if three nodes form a trianlge between themselves.
  function checkTriangle(ind1, ind2) {
    for (var i = 0; i < nodes[ind1].obj.linkedItems.length; i++) {
      var adjNodes = nodes[ind1].obj.linkedItems;
      if (adjNodes.indexOf(ind2) !== -1) {
        return true;
      }
    }
    return false;
  }

  // Checks if the two nodes have a color set that can be used...
  function checkColors(ind1, ind2) {
    if (nodes[ind1].obj.color !== null && nodes[ind2].obj.color !== null) {
      return true;
    }
    return false;
  }

  // iterates through all the potential colors, and if a tri-color is formed, that potential color is removed.
  function updatePotentialColors(curNode, ind2, ind3) {
    var color2 = nodes[ind2].obj.color; 
    var color3 = nodes[ind3].obj.color;
    var potColors = nodes[curNode].potentialColors;
    var i = potColors.length;
    while (i--) {
      if (potColors[i] !== color2 && potColors[i] !== color3 && color2 != color3) {
        nodes[curNode].potentialColors.splice(i, 1);
      }
    }
  }

})();



// ========================================================
// EXTRA CODE THAT WASN'T USED.

// function addPotentialColors(curNode, ind1, ind2) {
//   var color1 = nodes[ind1].obj.color;
//   var color2 = nodes[ind2].obj.color;
//   var nodesPotentialColors = nodes[curNode].potentialColors;
//   if (nodes[curNode].obj.color === null) {
//     if (nodes[curNode].potentialColors.indexOf(color1) === -1) {
//       nodes[curNode].potentialColors.push(color1);
//     }
//     if (nodes[curNode].potentialColors.indexOf(color2) === -1) {
//       nodes[curNode].potentialColors.push(color2);
//     }
//   }
// }


  // updateTriangles(true); 
  // var numTri = 20;
  // bruteForce(11);
  // function bruteForce(start) {
  //   var testNodes = nodes.slice();
  //   for (var i = start; i < 17; i++) {
  //     if (testNodes[i].potentialColors !== []) {
  //       for (var i = start; i < testNodes[i].potentialColors.length; i++) {
  //         testNodes[i].obj.color = testNodes[i].potentialColors[i];
  //         updateTriangles(false);
  //         bruteForce(i+1);
  //         if (i === 21) {
  //           checkTriangles();
  //         }
  //       }
  //     } 
  // else if (testNodes[i].valuesToIterate !== []) {
  //   for (var i = start; i < testNodes[i].potentialColors.length; i++) {
  //     testNodes[i].obj.color = testNodes[i].potentialColors[i];
  //     updateTriangles(false);
  //     bruteForce(i+1);
  //     if (i === 21) {
  //       checkTriangles();
  //     }
  //   }
  // }

  //     }
  //   }


  // updateTriangles(false); 
  // updateTriangles(true);  

  //   function checkPossibleColors(nodeIndex) {
  //     var lowestTrianglesFormed = 20;
  //     var whichColor = null;

  //     for (var i = 0; i < nodes[11].potentialColors.length; i++) {
  //       console.log(nodes[11].potentialColors); 
  //       nodes[11].obj.color = nodes[11].potentialColors[i];
  //       for (var i = 11; i < 22; i++) { 
  //         updateTriangles();
  //       } 
  //     } 

  //     return {
  //       lowestTrianglesFormed: lowestTrianglesFormed,
  //       whichColor: whichColor
  //     };
  //   }


  // var j = indexArray.length;
  // while (j--) {
  //   if (nodes[j].obj.color !== null) {
  //     indexArray.
  //   }
  // }

  //   function countFullTriangles() {
  //     for (var i = 11; i < 22; i++) {

  //     }
  //   }

  //   function minimizeTriangles(nodeIndex) {
  //     for (var i = 0; i < nodes[nodeIndex].obj.linkedItems.length - 1; i++) {
  //       var ind1 = nodes[nodeIndex].obj.linkedItems[i];
  //       for (var j = i+1; j < nodes[nodeIndex].obj.linkedItems.length; j++) {
  //         var ind2 = nodes[nodeIndex].obj.linkedItems[j];
  //         if (checkTriangle(ind1, ind2)) {

  //         }
  //       }
  //     }
  //   }  
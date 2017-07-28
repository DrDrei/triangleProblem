# Triangle Problem

Can you color the inside dots so as to create two complete triangles and no more?
I don't think so. I found a minimum of 3 complete triangles must be formed.


## APPROACH:
For this problem I used JS. My solution was based around using some sort of linked list to track the current nodes neighbors and build out from that, you can see in the screenshot I posted on github how I went about that. Each node then started off with all 3 possible colors array if it didn't already have a color. We then iterate through all the nodes and try to find the colors for the empty nodes that have only 1 possible fit. Running this a few times lead me to finding nodes 18 and 21 creating two definite tri-color triangles. 

I then iterated through all the possible combinations of nodes 18 and 21 (9 of them) to find that the minimum was formed around node 17 with 2 formed triangles and no potential colors for that node. Meaning that at least one more tri-color triangle has to be formed at node 17 to satisfy my approach.

Once again adding node 17 to nodes 18 and 21, and running them for each possible color combination gave me the solutions below. 

I wasn't sure if I had to build a general solution for a dynamic question, so I took the easy route and just solved it. I wanted to use recursion but wasn't entirely 100% sure how to do that and was running into timeouts in codepen. I left all the extra code that I wanted to use, but didn't, on the bottom for you to view.

## LENGTH:
around 5 hours.

## RESOURCES:
codepen
https://www.cs.utah.edu/~germain/PPS/Topics/recursion.html
https://www.w3schools.com/jsref/jsref_indexof_array.asp
https://stackoverflow.com/questions/237104/how-do-i-check-if-an-array-includes-an-object-in-javascript
checked splice and slice for js
nothing else really.


## EXECUTION:
To run the code and look at it, you can go to my this codepen link. You'll find all the code in the JS console. Output is shown in the console. It's the same as below. To run the code, you can just add a space anywhere in the code, and it will update and rerun itself (if it doesn't there should be a run button on the top).
https://codepen.io/DrDrei/pen/MvaZzV/


## SOLUTIONS:
Following color codes correspond to these nodes (you can see how I labeled the nodes in the screenshot on github)
[11,   12,  13,  14,  15,  16,  17, 18,  19,  20,   21]

["A", "C", "B", "C", "B", "A", "C", "A", "C", "C", "A"]
["A", "C", "B", "C", "B", "A", "A", "A", "C", "C", "B"]
["A", "C", "B", "C", "B", "A", "C", "A", "C", "C", "B"]
["A", "C", "B", "C", "B", "A", "A", "A", "C", "C", "C"]
["A", "C", "B", "C", "B", "A", "C", "A", "C", "C", "C"]
["A", "C", "B", "C", "B", "A", "A", "B", "C", "C", "A"]
["A", "C", "B", "C", "B", "A", "C", "B", "C", "C", "A"]
["A", "C", "B", "C", "B", "A", "A", "B", "C", "C", "B"]
["A", "C", "B", "C", "B", "A", "C", "B", "C", "C", "B"]
["A", "C", "B", "C", "B", "A", "A", "B", "C", "C", "C"]
["A", "C", "B", "C", "B", "A", "C", "B", "C", "C", "C"]
["A", "C", "B", "C", "B", "A", "A", "C", "C", "C", "A"]
["A", "C", "B", "C", "B", "A", "C", "C", "C", "C", "A"]
["A", "C", "B", "C", "B", "A", "A", "C", "C", "C", "B"]
["A", "C", "B", "C", "B", "A", "C", "C", "C", "C", "B"]
["A", "C", "B", "C", "B", "A", "A", "C", "C", "C", "C"]
["A", "C", "B", "C", "B", "A", "C", "C", "C", "C", "C"]
17
There are a total of 17 possible minimized color schemes with a minimum of 3 tri-color triangles formed.



//Creates a node object with left and right pointers which point to other nodes(objects) or null e.g {val,left:{val,left:null,right:null},right:null}etc
const node = function(value,left=null,right=null){
    return {value,left,right};
}


//merge sort function
const mergeSort = function(arr){

    //returns the array is it has only single element e.g[5] since its sorted
    if(arr.length <=1){
        return arr;
    }

    else{

        //if array is alrger than 1,it is broken into two peics from center, that is start to mid(excliuded) and then mid to end
        let mid = Math.floor(arr.length/2);
        let left = arr.slice(0,mid);
        let right = arr.slice(mid);


        //the array is recursively broken into chunks until they reach the base case, where length is 1 and the single ele arr is returned
        //the two arrays are then merged and return into a larger merge until the final array is obtained
        return merge(mergeSort(left),mergeSort(right));
    }
}

//merges two arrays
const merge = function(left,right){

//res to store results, i,j for indices
let res = [];
let i = 0;
let j=0;
//the loop constantly compares elements from two arrs and then pushes the smaller element into result
while(i<left.length && j<right.length){
    if(left[i]<right[j]){
        res.push(left[i]);
        i++;
    }

    else{
        res.push(right[j]);
        j++;
    }
}


//if array sizes are unequal, one of the arrays might have ledtover elements with nothing to compare to, they are pushed in ot the result
while(i<left.length){
    res.push(left[i]);
    i++;
}

while(j<right.length){
    res.push(right[j]);
    j++;
}

return res;

}

//function to build a tree of nodes from a sorted list
const buildTree = function(arr,start,end){
    //base condition, means the leaf nodes are reached and dont point to other nodes, thus null is returned
    if(start>end){
        return null;
    }

    else{
        //a node for the middle element is recurisvely created and the left and rigth nodes are set
        let mid = parseInt((start+end)/2);
        let root = node(arr[mid]);


        //this recursion runs until buildTree returns null, so the left and right of the node is set;
        root.left = buildTree(arr,start,mid-1);
        root.right = buildTree(arr,mid+1,end);


        //after the left,rigth are set, the node is returned which inturn is set as left and rigth os some other node until root
        return root;
    }

}

//used to print the tree in a funny way 
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


//contains tree functions
const Tree = function(arr){
    //used buildtree to obtain an BST in the form of an object
    let root = buildTree(arr,0,arr.length-1);
    
    const display = function(){
        console.log(root);
        prettyPrint(root);
    }

    const getRoot = function(){
        return root;
    }

    //function to insert a value at a leaf node
    const insert = function(val,rt=root){
        if(rt.left ==null || rt.right==null){
            //if a node with free space is found(lesf or semi leaf)


            //insert left
            if(rt.left == null && val<rt.value){
                rt.left = node(val);
            }
            //insert rigth
            else if(rt.right==null && val>rt.value){
                rt.right = node(val);
            }

            //go to child node if above conditions not satisfied
            else if(rt.left !=null){
                insert(val,rt.left);
            }

            else if(rt.right!=null){
                insert(val,rt.right);
            }

            
            return;
        }
        //if the given node(root first) is not a leaf node, then the tree is traversed recursively based on value of current node
        //left if less, right if more
        else{
            if(val<rt.value){
                insert(val,rt.left)
            }

            else{
                insert(val,rt.right);
            }
        }
    }

    //function to delete a node and save the updated version to root
    const deleteKey = function(key){
        root = deleteRec(root,key);
    }

    //function to remove a node recursively
    const deleteRec = function(root,key){

        //base case, if root is null, then root is returned
        if(root==null){
            return root;
        }

        
        //if given key is less than root,left subtree is searched
        //it is assigned to root.left so that the updated version is stored
        //recusively continues until finds the correct node
        if(key<root.value){
            root.left = deleteRec(root.left,key);
        }
        //if given key is more than root,right subtree is searched
        else if(key>root.value){
            root.right = deleteRec(root.right,key);
        }



        //if node with the key is found
        else{


            //if node only has one child(or no child), then easily removed
            //the deleted node is replace with its child(might be null if no child)
            if(root.left==null){
                return root.right;
            }

            else if(root.right==null){
                return root.left;
            }

            //if two children present
            //then the inorder minval is found
            //minval is the value in the rigth subtree which is just a little more than deleted node

            root.value = minVal(root.right);
            //the deleted node is replaced with the minval
            //the original minval node is deleted from the rigth subtree
            root.right = deleteRec(root.right,root.value);
        }
        //the node is returned
        return root;
    }




    const minVal = function(root){

        //assumes root is the smallest value
        let min = root.value;
        while(root.left != null){

            //searches left subtree if it exists and moves to the inner left subtree
           min = root.left.value;
           root = root.left;
        }

        //returns the lowest value in the given subtree
        return min;
    }


    const find = function(val,rt=root){

        //base cas
        //checks if the correct node is obtained
        if(rt.value == val){
            console.log(rt);
            console.log("found");
            return rt;
        }


        //traverses the tree if node is not correct
        else{
            if(val<rt.value){
                return find(val,rt.left);
            }

            else{
                return find(val,rt.right);
            }
        }
    }


    //used for breadth first traversal or levelorder travsersal
    const levelOrder = function(){

        //maintains a queue
        let q = [];

        //root is pushed to queue
        q.push(root);


        //while queue not empty
        while(q.length != 0){

            //if not empty
            //fist element is read adn processed
            let cur = q[0];
            console.log(cur);
            console.log(cur.value);

            //Its children are pushed to the queue
            if(cur.left!=null){
                q.push(cur.left);
            }

            if(cur.right!=null){
                q.push(cur.right);
            }


            //the element read already is removed

            q.shift();
        }
    }








    return{display,insert,deleteKey,find,levelOrder}
}


let arr = [2,5,1,3,7,9,6,8];
let a = mergeSort(arr);


t = Tree(a);
t.display();
t.levelOrder();





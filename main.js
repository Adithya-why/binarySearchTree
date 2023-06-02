console.log("HIIIII");

const node = function(value,left=null,right=null){
    return {value,left,right};
}

const Tree = function(arr){
    let root = buildTree(arr);

}

const mergeSort = function(arr){
    if(arr.length <=1){
        return arr;
    }

    else{
        let mid = Math.floor(arr.length/2);
        let left = arr.slice(0,mid);
        let right = arr.slice(mid);

        return merge(mergeSort(left),mergeSort(right));
    }
}


const merge = function(left,right){
let res = [];
let i = 0;
let j=0;

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


const buildTree = function(arr,start,end){

    if(start>end){
        return null;
    }

    else{
        let mid = parseInt((start+end)/2);
        let root = node(arr[mid]);

        root.left = buildTree(arr,start,mid-1);
        root.right = buildTree(arr,mid+1,end);

        return root;
    }

}


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



let arr = [2,5,1,3,7,9,6];
let a = mergeSort(arr);
console.log(a);

let r = buildTree(a,0,a.length-1);
console.log(r);
prettyPrint(r);





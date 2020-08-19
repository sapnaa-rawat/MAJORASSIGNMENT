unsortedArr();
function unsortedArr() {
    let arr = [1, 43, 'Hello', 5, 12, 'NodeJs', 49];
    for (var inner_loop = 0; inner_loop < arr.length; inner_loop++) {
        for (var outer_loop = inner_loop; outer_loop < arr.length; outer_loop++) {
            if (arr[inner_loop] > arr[outer_loop]) {
                var temp = arr[inner_loop];
                arr[inner_loop] = arr[outer_loop];
                arr[outer_loop] = temp;
            }
        }
        console.log(arr);
    }

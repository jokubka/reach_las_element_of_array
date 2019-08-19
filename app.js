function parseAndValidate(input) {
   const parsed = input
      .split(',')
      .filter(element => element !== '')
      .map(element => parseInt(element.trim()));

   if (parsed.some(element => isNaN(element)) || parsed.length === 0) {
      return false;
   }
   return parsed;
}

function calculatePath(inputArray) {
   let pathArray = [];
   const minJumpsArray = [0];

   for (let i = 0; i < inputArray.length - 1; i++) {
      minJumpsArray.push(Infinity);
   }

   for (let i = 1; i < inputArray.length; i++) {
      for (let j = 0; j < i; j++) {
         if (i <= j + inputArray[j]) {
            minJumpsArray[i] = Math.min(minJumpsArray[i], minJumpsArray[j] + 1);

            if (minJumpsArray[i] > minJumpsArray[i - 1]) {
               const lastInPathArray = pathArray[pathArray.length - 1];

               if (pathArray.length < minJumpsArray[i]) {
                  pathArray.push(j);
               }

               if (pathArray.length === minJumpsArray[i] && inputArray[j] > inputArray[lastInPathArray]) {
                  pathArray[pathArray.length - 1] = j;
               }
            }
         }
      }
   }
   if (minJumpsArray[minJumpsArray.length - 1] !== Infinity) {
      pathArray = pathArray.map(i => `${inputArray[i]} &#8658; `).join('');
      pathArray += inputArray[inputArray.length - 1];
   } else {
      return false;
   }

   console.log(inputArray);
   console.log(minJumpsArray);
   console.log(pathArray);
   return pathArray;
}

function check() {
   const input = document.querySelector('.input-block__input');
   const outputArrayText = document.querySelector('.output-block__array-text');
   const outputResultText = document.querySelector('.output-block__result-text');
   const outputPath = document.querySelector('.output-block__path-text');
   let inputArray = [];

   outputArrayText.textContent = '';
   outputResultText.textContent = '';
   outputPath.textContent = '';

   inputArray = parseAndValidate(input.value);

   input.value = '';

   if (!inputArray) {
      outputResultText.textContent = 'Wrong input! Must contain numbers.';
      return;
   }

   outputArrayText.textContent = `[ ${inputArray.map(element => ` ${element}`)} ]`;

   const output = calculatePath(inputArray);

   if (!output) {
      outputResultText.textContent = 'End of array is NOT reachable!';
   } else {
      outputResultText.textContent = 'Shortest path to the end of array:';
      outputPath.innerHTML = output;
   }
}

const checkButton = document.querySelector('.input-block__button');

checkButton.addEventListener('click', check);

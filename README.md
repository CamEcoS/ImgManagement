# Get started

download the code, run npm i then run npm start and finally click on the open Button

# Functionality

0. this component is responsive

1. ImgSlot is the main component, it holds an array of imgSlots that allows images to be dragged n dropped and well as manually adding an image. 

2. When an image is added or when a slot with a none default image is selected, options will appear below. If a slot has a default image and is clicked upon, manually selection appears

3. The options are
    - edit image
    - full screen
    - crop
    - remove  

4. Cropping is a fixed modal that offers the option to crop or close and is responsive to almost bare minimum size

5. the component also has the ability to add more otional images and edit their title

# Usage

Simply add the component and pass an object of props to the **attribute** prop

Here are the props below:

   - mandatoryTitles: Array of string,
   - optionalAmount: number,
   - acceptedFormat: string,
   defaultFile: string as image path,
   - currentState: to be used when connecting to backend is null for now, 
   - width: number,
   - height: number,
   - contHeight:can be null or 100 for full screen its in percentage,
   - contWidth:can be null or 100 for full screen its in percentage

   # Testing

   - App is rendered
   - All image rendered successfully with same default image, ability to upload and drop
   - can change optional titles
   - can add new optional slots
   - ImgControlSection appears when index match
   - all ImgControlSection events are triggering
   - can trigger the close button on crop and fullscreen




Crocheting is a type of fiber art - and a subsection of it involves making beautiful tapestries. However, it is very difficult to create such detailed images from just scratch and no roadmap to follow. This project utilizes the k_means clustering algorithm (written from scratch) to extract key colors from images and reconstruct complex images with simplified colors. This makes the tapestry making process significantly easier and allows crocheters to effectively plan out their projects from the start. Users can enter how many colors they want to use and the dimensions, and the app will return a pixel art image which best represents the original picture in the limited color palette. Future direction is to take this information and construct a crochet guide stitch-by-stitch to create beautiful tapestries with complex images. Additionally, I am currently working on integrating a yarn API so that the best colors the algorithm chooses are available as purchaseable yarn from the store. 

Featuring a very simple interface, simply upload an image and desired stitch amounts and receive the simiplified image on the right:
<img width="1132" alt="image" src="https://github.com/spshah2005/fiberflow/assets/146762800/59492d64-6d8b-4928-9d52-380f110d992a">

Next scroll to the grid page for a crochet-along experience:
<img width="1066" alt="image" src="https://github.com/spshah2005/fiberflow/assets/146762800/44472d2f-5f89-4ca9-a4a7-b7a0fa6301a9">

To activate environment, run npm start in the front-end and start the flask-server.

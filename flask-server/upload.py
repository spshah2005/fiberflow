from flask import Flask,request,jsonify,send_file
from flask_cors import CORS
from PIL import Image, ImageOps
import random
import numpy as np
from io import BytesIO

app = Flask(__name__)
CORS(app)
#upload route
@app.route("/upload", methods=['POST'])

def upload(): 
    # try:
    #     # Retrieve form data
    #     form_data = request.form
        
    #     # Convert form data to dictionary
    #     print(form_data)
    #     data = {key: form_data[key] for key in form_data}
    #     img = request.files['image']
    #     newimg = kmeans(img)
    #     data['kmeans_image'] = newimg
    #     print(newimg)
    #     return send_file(newimg, mimetype='image/png', as_attachment=True, attachment_filename='kmeans_out.png')
    try:
        file = request.files['image']
        # Open the image file
        img = Image.open(file.stream)
        
        # Perform some processing on the image (e.g., convert to grayscale)
        #out_img = ImageOps.grayscale(img)
        out_img = kmeans(img)
        
        # Save processed image to a BytesIO object
        img_io = BytesIO()
        out_img.save(img_io, 'PNG')
        img_io.seek(0)
        
        # Send the processed image back
        return send_file(img_io, mimetype='image/png')
    except Exception as e:
        # In case of an error, return an error message
        return jsonify({'error': str(e)}), 500

def openImage(image):
    pix = image.load()
    imgArray = [[] for i in range(image.height)]
    for x in range(image.width):
        for y in range(image.height):
            imgArray[y].append(pix[x,y])
    return imgArray


def squareDistance(pix1,pix2):
    return (pix2[2]-pix1[2])**2+(pix2[1]-pix1[1])**2+(pix2[0]-pix1[0])**2

def closestCentroid(pixel,centroids):
    mindist = squareDistance(centroids[0],pixel)
    minIndex = 0
    for i in range(1,len(centroids)):
        if centroids[i]:
            dist=squareDistance(centroids[i],pixel)
            if dist<mindist:
                mindist = dist
                minIndex = i

    return centroids[minIndex], mindist, minIndex

def nextCentroid(imgArray,centroids):
    farthest=0
    nextCenter = None
    nextIndex = None
    for r in range(len(imgArray)):
        for c in range(len(imgArray[0])):
            closestCenter, distance, centIndex = closestCentroid(imgArray[r][c],centroids)
            if distance >= farthest:
                farthest = distance
                nextCenter = imgArray[r][c]
                nextIndex = centIndex
    return nextCenter, nextIndex

def chooseCentroids(k,imgArray):
    centroids = [None]*k
    centroids[0] = imgArray[random.randint(0,len(imgArray))][random.randint(0,len(imgArray[0]))]
    for i in range(1,len(centroids)):
        centroids[i], nextIndex = nextCentroid(imgArray,centroids)
    return centroids

def newCentroids(clusters):
    centroids = []
    for cluster in clusters:
        red = 0
        green = 0
        blue = 0
        for pix in cluster:
            red+=pix[0]; green+=pix[1]; blue+=pix[2]
        centroids.append((red/len(cluster),green/len(cluster),blue/len(cluster)))
    return centroids

def compareCentroids(old,new):
    for i in range(len(old)):
        if (round(old[i][0])!=round(new[i][0]) and round(old[i][1])!=round(new[i][1]) and round(old[i][2])!=round(new[i][2])):
            return False
    return True

def constructKMeansImg(centers,clusters,imgArray):
    colorMap = dict()
    for i in range(len(centers)):
        centers[i] = (round(centers[i][0]), round(centers[i][1]), round(centers[i][2]))
        for pix in clusters[i]:
            colorMap[pix] = centers[i]
    newImg = [[None]*len(imgArray[0]) for i in range(len(imgArray))]
    for r in range(len(imgArray)):
        for c in range(len(imgArray[0])):
            newImg[r][c] = colorMap[imgArray[r][c]]
    output_image = Image.fromarray(np.uint8(newImg))
    print('output complete')
    return output_image
    
def kmeans(im):
    imgArray = openImage(im)
    k = 8
    print('image openned')
    centroids = chooseCentroids(k,imgArray)
    #print(centroids)
    print('initial centroids selected')
    clusters = [[] for i in range(k)]
    converged = False
    while not converged:
        print(centroids)
        for r in range(len(imgArray)):
            for c in range(len(imgArray[0])):
                closestcenter,dist,centIndex = closestCentroid(imgArray[r][c],centroids)
                clusters[centIndex].append(imgArray[r][c])
        newcentroids = newCentroids(clusters)
        print(newcentroids)
        if compareCentroids(centroids,newcentroids): converged = True
        else: centroids = newcentroids
    print('kmeans clustering complete')
    return constructKMeansImg(centroids,clusters,imgArray)

    
if __name__ == "__main__":
    app.run(debug=True)
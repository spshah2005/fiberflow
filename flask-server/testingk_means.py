from PIL import Image
import random
import numpy as np

def openImage(img):
    image = Image.open(img)
    pix = image.load()
    imgArray = [[] for i in range(image.height)]
    for x in range(image.width):
        for y in range(image.height):
            imgArray[y].append(pix[x,y])
    return image,pix,imgArray


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
    output_image.save("test_result.png")
    print(centers)
    print('output complete')
    
def kmeans(im):
    image,pix,imgArray = openImage(im)
    k = 27
    print('image openned')
    centroids = chooseCentroids(k,imgArray)
    #print(centroids)
    print('initial centroids selected')
    clusters = [[] for i in range(k)]
    converged = False
    while not converged:
        print(centroids)
        newclusters = [[] for i in range(k)]
        for r in range(len(imgArray)):
            for c in range(len(imgArray[0])):
                closestcenter,dist,centIndex = closestCentroid(imgArray[r][c],centroids)
                newclusters[centIndex].append(imgArray[r][c])
        centroids = newCentroids(newclusters)
        if clusters==newclusters: converged = True
        else: clusters = newclusters
    print('kmeans clustering complete')
    # print(centroids)
    # print(clusters)
    constructKMeansImg(centroids,clusters,imgArray)


kmeans('/Users/shrutishah/fiberflow/flask-server/me.png')
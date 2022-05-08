const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const axios = require('axios')
//Load env vars
dotenv.config({ path: './config/config.env' })

//Route files

const app = express()

//Mount routers
app.use(cors())

app.get('/api/v1/my-gallery', async (req, res) => {
  let url =
    //'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=3092f70c7f03ccb6665c7d4bdf43fe68&gallery_id=72157720607928857&get_gallery_info=&format=json&nojsoncallback=1'
    `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${process.env.API_KEY}&gallery_id=72157720607928857&get_gallery_info=&format=json&nojsoncallback=1`
  if (req.method === 'GET') {
    try {
      const { data } = await axios.get(url)
      const list = data.photos.photo.map((photo) => {
        return {
          id: photo.id,
          title: photo.title,
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        }
      })

      res.status(200).json({
        status: 'success',
        list,
      })
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      })
    }
  } else {
    res.status(405).send({
      error: 'Method not allowed',
    })
  }
})

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
  console.log(
    `Server running on port  ${PORT} , running on ${process.env.NODE_ENV} mode`
  )
})

const convertToSize = async (originalSize, imageDataArray)=>{
    const convertedImages = await imageDataArray.map((image) => {
        // Construir la URL con el tamaño especificado
        const imageUrl = `https://images.igdb.com/igdb/image/upload/t_${originalSize}/${image.image_id}.jpg`;

        // Agregar la URL ajustada al objeto de imagen
        return {
            // ...image,
            urlMiniatura: image.url,
            urlOriginal: imageUrl,
        };
    });
    return convertedImages;
}


const formatoVideoYT = async (videoDataArray)=>{
    const convertedVideos = await videoDataArray.map((video) => {
        // Construir la URL con el tamaño especificado
        const videoUrl = `https://www.youtube.com/watch?v=${video.video_id}`;
        // Agregar la URL ajustada al objeto de imagen
        return {
            // ...video,
            name: video.name,
            urlYoutube: videoUrl,
            
        };
    });
    return convertedVideos;
}


const formatoEventLogo = async (originalSize, eventLogoDataArray)=>{
    const convertedVideos = await eventLogoDataArray.map((eventLogo) => {
         // Construir la URL con el tamaño especificado
         const imageUrl = `https://images.igdb.com/igdb/image/upload/t_${originalSize}/${eventLogo.image_id}.jpg`;

         // Agregar la URL ajustada al objeto de imagen
         return {
             // ...image,
             urlOriginal: imageUrl,
         };
    });
    return convertedVideos;
}

module.exports = {convertToSize, formatoVideoYT, formatoEventLogo};
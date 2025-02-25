const Product = require('../Models/productModels');
const ApiFeatures = require('../Utils/apiFeatures')
const cloudinary = require('cloudinary').v2



// const createProduct = async (req, res, next) => {
//     try {
      
//         let images = [];

//         if (req.body.image) {
//             if (typeof req.body.image === 'string') {
//                 images.push(req.body.image);
//             } else {
//                 images = [req.body.image];
//             }
//         }
      
//         const imageLinks = [];

//         // Upload images to cloudinary
//         for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.uploader.upload(images[i], {
//                 folder: 'products'
//             });

//             imageLinks.push({
//                 public_id: result.public_id,
//                 url: result.secure_url
//             });
//         }

//         req.body.images = imageLinks;
//         req.body.user = req.user._id; 

//         const product = await Product.create(req.body);
        
//         res.status(201).json({
//             success: true,
//             product
//         });

//     } catch (error) {
//         console.error('Error creating product:', error); 
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };



const createProduct = async (req, res, next) => {
    try {
        let imageLinks = [];
        
        // Check if files exist in form-data
        if (req.files) {
            // Upload each file to cloudinary
            for (const file of Object.values(req.files)) {
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'products'
                });
                
                imageLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            }
        }

        req.body.images = imageLinks;
        req.body.user = req.user._id;

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllProducts = async (req, res) =>{
    try {
        
        //per page 8 product dikhana
        const resultPerPage = 8 

         //total product count code 
         const productCount = await Product.countDocuments();

         const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter()

         //apply pagination
       apiFeature.pagination(resultPerPage)

         //fetch filterd products 
         let products = await apiFeature.query;

            // Filtered products ki count calculate
       let filterdProductsCount = products.length

       //Final filtered products ko database se dobara fetch karna

       console.log(filterdProductsCount)

       res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filterdProductsCount
       })

    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
}
}

 const getCategoryProducts = async(req ,res) =>{
    try {
       
        const products = await Product.find({category: req.query.category})

        //console.log(req.query.category)

        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
 }

  const getAdminProducts = async(req ,res) =>{

    try {
       
        const products = await Product.find()

        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
           success:true
        })
    }
  }

  const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Product Not Found',
                success: false
            });
        }

        // Handle images
        let images = [];
        if (req.body.images) {
            images = typeof req.body.images === 'string' ? [req.body.images] : req.body.images;
        }

        try {
            if (images.length > 0) {
                // Delete old images from cloudinary
                for (let i = 0; i < product.images.length; i++) {
                    if (product.images[i].public_id) {
                        await cloudinary.uploader.destroy(product.images[i].public_id);
                    }
                }

                // Upload new images
                const imageLinks = await Promise.all(
                    images.map(async (image) => {
                        // Verify the image is a valid base64 data URI
                        if (!image.startsWith('data:image')) {
                            throw new Error('Invalid image format');
                        }

                        const result = await cloudinary.uploader.upload(image, {
                            folder: 'products',
                            resource_type: 'auto'
                        });

                        return {
                            public_id: result.public_id,
                            url: result.secure_url
                        };
                    })
                );

                req.body.images = imageLinks;
            }
        } catch (cloudinaryError) {
            console.error('Cloudinary error details:', cloudinaryError);
            return res.status(500).json({
                message: 'Error processing images: ' + cloudinaryError.message,
                success: false
            });
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );

        res.status(200).json({
            success: true,
            product: updatedProduct
        });

    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


   const deleteProduct = async (req ,res)=>{

    try {
       
        let userId = req.params.id
        
        let product = await Product.findById(userId)

        if(!product){
            return res.status(401).json({
                message:'Product Not Found',
                success:false
            })
        }

        //delete image from cloudinary 

        for(let i = 0; i < product.images.length; i++){
            await cloudinary.uploader.destroy(product.images[i].public_id)
        }

        product = await Product.findByIdAndDelete(userId)

        res.status(200).json({
            success: true,
            message: ["Product deleted successfully", product]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    }
   

    const getProductDetails = async (req , res) =>{
        try {
           
            const product = await Product.findById(req.params.id)

            if(!product){
                return res.status(401).json({
                    message:'Product Not Found',
                    success:false
                })
            }

            res.status(200).json({
                success:true,
                product
            })
        } catch (error) {
            res.status(500).json({
                message:error.message,
                success:false
            })
        }
    }

    const createProductReview = async (req , res) =>{
        try {
            
            const {rating , comment , productId} = req.body
            const user = req.user;  

            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
          

            // Ensure ki product.reviews exist kare
        if (!product.reviews) {
            product.reviews = []; 
        }
          



        const review = {
            user: user._id,
            name: user.name,
            rating: Number(rating),
            comment
        };
            //user ne phle se review dia hai ya nahi 
            const isReviewed = product.reviews.find(
                (rev) => rev.user.toString() === user._id.toString()
            );

            if (isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user.toString() === user._id.toString()) {
                        rev.rating = rating;
                        rev.comment = comment;
                    }
                });
            } else {
                product.reviews.push(review)
                
            }
            product.numOfReviews = product.reviews.length

            let avg = 0

            product.reviews.forEach(rev=>{
                avg+= rev.rating
            })

            product.rating = avg / product.reviews.length

            await product.save({validateBeforeSave:false})

            res.status(200).json({
                success: true,
                message: "Review Done"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:error.message,
                success:false
            })
        }
    }

    const getProductReview = async (req , res) =>{

        try {
            const product = await Product.findById(req.query.id)
    
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "Product not exist"
                })
            }
    
            res.status(200).json({
                success: true,
                reviews: product.reviews
            })
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const delteReview = async (req , res) =>{

        try {
           
            const product = await Product.findById(req.query.productId);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "Product not exists"
                })
            }
    
            const reviews = product.reviews.filter(
                (rev) => rev._id.toString() !== req.query.id.toString()
            );

            let avg = 0;

            reviews.forEach((rev) => {
                avg += rev.rating;
            })
    
            let ratings = 0
    
            if (reviews.length === 0) {
                ratings = 0;
            } else {
                ratings = avg / reviews.length;
            }

            
        const productUpdated = await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            rating: ratings,
            numOfReviews: reviews.length,
        },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
        res.status(200).json({
            success: true,
            message: "Review Deleted",
            productUpdated
        })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const getEveryProduct = async (req , res) =>{
        try{

            const products = await Product.find()
    
            res.status(200).json({
                success: true,
                products
            })
    
        }catch(error){
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
module.exports = { createProduct , getAllProducts ,getCategoryProducts, getAdminProducts,updateProduct,deleteProduct,getProductDetails ,createProductReview,getProductReview,delteReview,getEveryProduct}
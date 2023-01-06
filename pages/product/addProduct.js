import React, {useEffect, useState} from 'react';
import AddImageBtn from "../../components/Buttons/AddImageBtn";
import {downloadImages} from "../../api/product/Image";
import ProductButton from "../../components/Buttons/ProductButton";
import InsertField from "../../components/InputFields/InsertField";
import {addProductHandler} from "../../api/product/productFuncs";
import {toast} from "react-toastify";

const AddProduct = () => {
    //Form States
    const [SKU, setSKU] = useState('');
    const [name, setName] = useState('');
    const [QTY, setQTY] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    //Image states
    const [imageArray, setImageArray] = useState([]);
    const [imageBase64Array, setImageBase64Array] = useState([]);
    const [loading, setLoading] = useState(false);


    //* add image IDs to an array
    const handleImageArray = (imageId) => {
        setImageArray((prev) => {
            return [...prev, imageId];
        })
        setLoading(true);
    };

    //* get images from those IDs
    useEffect(() => {
        downloadImages(imageArray).then(res => {
            setImageBase64Array(res);
            setLoading(false);
        })
    }, [imageArray]);

    const handleProductAdd = async (event) => {

        event.preventDefault();

        if (SKU.trim() === '' || name.trim() === '' || QTY.trim() === '' || productDescription.trim() === '') {
            toast.error('Please fill all fields');
            return;
        }

        const product = {
            SKU: SKU,
            Name: name,
            QTY: QTY,
            Description: productDescription,
            ImageIDs: imageArray,
            selectedImage: selectedImage ? selectedImage : imageArray[0]
        };

        await addProductHandler(product)

    }

    return (
        <>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-8 md:gap-6">
                    <div className="mt-5 md:mt-0 md:col-span-6 md:col-start-2">
                        <div>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-1 grid-rows-4 gap-3">
                                        <div className="row-span-2">
                                            <div className="grid grid-cols-2 grid-rows-1 items-center">
                                                <InsertField title={'SKU'} value={SKU} setValue={setSKU}/>
                                            </div>
                                        </div>
                                        <div className="row-span-2">
                                            <div className="grid grid-cols-2 grid-rows-1 items-center">
                                                <InsertField title={'Name'} value={name} setValue={setName}/>
                                                <InsertField title={'QTY'} value={QTY} setValue={setQTY} type={'number'}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <div className="text-text text-md font-semibold">Product Description</div>
                                        <div className="text-text text-xs font-extralight mb-4">A small description
                                            about the product
                                        </div>
                                        <div className="grid grid-cols-1 grid-rows-1">
                                            <textarea
                                                onChange={(e) => setProductDescription(e.target.value)}
                                                className="block w-full border-0 border-b border-transparent bg-background focus:border-indigo-600 focus:ring-0 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <div className={`grid grid-cols-6 gap-2`}>
                                        <div>
                                            <div className="text-text text-md font-semibold">Product Images</div>
                                            <div className="text-text text-xs font-extralight mb-4">JPEG, PNG, SVG or
                                                GIF (Maximum file size 50MB)
                                            </div>
                                        </div>
                                        {imageBase64Array.map((image, index) => {
                                            return (
                                                <div key={index}>
                                                    <img
                                                        onClick={() => {
                                                            setSelectedImage(imageArray[index])
                                                        }}
                                                        key={index}
                                                        src={`data:jpeg;base64,${image}`}
                                                        alt=""
                                                        className={`w-full h-full object-cover rounded-lg ${index === imageArray.indexOf(selectedImage) ? 'border-2 border-primary' : ''}`}/>
                                                </div>
                                            )
                                        })}
                                        {loading ? <p>Loading...</p> : null}
                                        <AddImageBtn
                                            btnText={imageArray.length > 0 ? 'Edit Images' : 'Add Image'}
                                            handleImageArray={handleImageArray}/>
                                    </div>

                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <ProductButton handleAction={handleProductAdd} name={"Add Product"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AddProduct;

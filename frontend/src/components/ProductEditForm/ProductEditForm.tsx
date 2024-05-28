import { ChangeEvent, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react"
import styles from "./ProductEditForm.module.scss"
import TextInput from "../TextInput"
import AdminService from "@/services/Admin.service"
import { Context } from "@/main"
import { ProductData } from "@/types/ProductData"
import ImageInput from "../ImageInput"
import Button from "../Button"
import { CustomError } from "@/types/CustomError"
import Select, { OnChangeValue } from "react-select"
import { SelectOption } from "@/types/SelectOption"
import { observer } from "mobx-react-lite"
import _ from "lodash"
import ModalContainer from "@/components/ModalContainer"
import ConfirmationModal from "@/components/ConfirmationModal"

interface ProductEditFormProps {
  product?: ProductData
  rerenderProductList: () => void
  isFullscreenOpen: boolean
  onButtonClick: () => void
  // confirmationModalData: {
  //   show: boolean
  //   text: string
  //   onYesCallback: () => void
  //   onNoCallback: () => void
  // }
  setConfirmationModalData: Dispatch<SetStateAction<{
    show: boolean
    text: string
    onYesCallback: () => void
    onNoCallback: () => void
  }>>
}

const ProductEditForm: FC<ProductEditFormProps> = ({ product, rerenderProductList, isFullscreenOpen, onButtonClick, setConfirmationModalData }) => {
  const { productStore } = useContext(Context)
  const [editedProduct, setEditedProduct] = useState<ProductData>(product ? 
    {...product, photo: product?.photo.split('/').pop() || ''} 
    :
    {
      id: 0,
      categoryId: 0,
      name: '',
      photo: '',
      price: 0,
      weight: 0,
      description: ''
    }
  )
  const [image, setImage] = useState<File | null>(null)
  const formData = new FormData()

  const createFormData = () => {
    editedProduct.id && formData.append('id', editedProduct.id+'')
    formData.append('categoryId', editedProduct.categoryId+'')
    formData.append('name', editedProduct.name)
    if (image && image?.name !== product?.photo.split('/').pop()) {
      formData.append('photo', image)
      formData.append('oldPhotoPath', product?.photo.split('/').slice(-2).join('/') || '')
      console.log(product?.photo)
      console.log(formData.get('photo'))
      console.log(formData.get('oldPhotoPath'))
    } else {
      formData.append('photo', editedProduct.photo)
    }
    console.log(formData.get('photo'), editedProduct.photo)
    formData.append('price', editedProduct.price+'')
    formData.append('weight', editedProduct.weight+'')
    formData.append('description', editedProduct.description)
    console.log([...formData.entries()])
  }

  const getImageByUrl = (url?: string) => {
    if (url) {
      fetch(url).then(res => res.blob()).then(blob => setImage(new File([blob], url.split('/').pop() || '')))
    }
  }

  const [options, setOptions] = useState<SelectOption[]>([])

  useEffect(() => {
    // productStore.fetchCategories()
    // setOptions(productStore.categories.map(category => {
    //   return {
    //     value: category.id+'',
    //     label: category.name
    //   }
    // }))
    const fetchAndSetCategories = async () => {
      await productStore.fetchCategories()
      const newOptions = productStore.categories.map(category => ({
        value: category.id + '',
        label: category.name
      }))
      setOptions(newOptions)
    }
    fetchAndSetCategories()
  }, [])

  const errorIndexToInput: {[key: string]: number} = {
    'name': 0,
    'categoryId': 1,
    'photo': 2,
    'price': 3,
    'weight': 4,
    'description': 5
  }

  const [errors, setErrors] = useState<CustomError[]>([
    {
      message: '',
      show: false
    },
    {
      message: '',
      show: false
    },
    {
      message: '',
      show: false
    },
    {
      message: '',
      show: false
    },
    {
      message: '',
      show: false
    },
    {
      message: '',
      show: false
    }
  ])

  const updateErrors = (errorId: number, newError: CustomError) => {
    let newErrorsArray = errors
    newErrorsArray[errorId] = newError
    setErrors(errors.map((error, index) => 
      index === errorId ? newError : error
    ))
  }

  const replaceSymbols = (str: string) => {
    return str.replace(/[^0-9]/g, '')
  }

  const changeEditedProduct = (key: string, value: string | number | null) => {
    setEditedProduct(prevState => {
      return {
        ...prevState,
        [key]: value
      }
    })
    updateErrors(errorIndexToInput[key], {
      message: '',
      show: false
    })
  }

  const checkEditedProduct = () => {
    // setError({
    //   message: 'Заповніть поле',
    //   show: true
    // })
    // console.log(Object.entries(editedProduct))
    const fieldsArray = Object.entries(editedProduct)
    fieldsArray.forEach((entry: [string, string | number]) => {
      if (!entry[1]) {
        updateErrors(errorIndexToInput[entry[0]], {
          message: 'Заповніть поле',
          show: true
        })
        document.getElementById('slideDownScrollPanel')?.scrollTo({
          top: 1
        })
      }
    })
    // return fieldsArray.every((entry: [string, string | number]) => {
    //   return !!entry[1]
    // })
    return errors.every((error: CustomError) => {
      return _.isEqual(error, {
        message: '',
        show: false
      })
    })
  }

  const clearConfirmationModalData = () => setConfirmationModalData({
    show: false,
    text: '',
    onYesCallback: () => {},
    onNoCallback: () => {}
  })

  useEffect(() => {
    getImageByUrl(product?.photo)
  }, [])

  // console.log(product?.categoryId+'' || null)
  // console.log(errors[0])
  // console.log({...options.filter(option => (option.value) === (editedProduct.categoryId+''))[0]})
  // console.log()
  // console.log(options.filter(option => (option.value) === (product?.categoryId+'' || null))[0])
  return (
    <div className={styles.container}>
      <TextInput error={errors[0]} label="Назва" placeholder="Назва" theme='white' size='big' inputType='singleLine' value={editedProduct.name} onValueChange={(e) => changeEditedProduct('name', e.target.value)} />
      <div style={{position: 'relative', width: '85vw'}} key={editedProduct.categoryId}>
        {errors[1]?.show ? 
          <span className={styles.errorMessage}>{errors[1].message}</span>
          : 
          <span className={styles.label}>Категорія</span>
        }
        <Select 
          // key={editedProduct.categoryId}
          placeholder='Категорія'
          // defaultValue={[{value: product?.categoryId+'', label: productStore.categories[0].name}]}
          value={
            // productStore.categories
            //   .filter(category => (category.id) === (product?.categoryId))
            //   .map(category => {
            //     return {
            //       value: category.id+'', 
            //       label: category.name}
            //     }
            //   )
            options.filter(({ value }) => value === editedProduct.categoryId+'')
          }
          // defaultValue={() => {
          //   const { id, name } = productStore.categories.filter(category => (category.id) === (product?.categoryId))[0]
          //   return {value: id, label: name}
          // }}
          options={options}
          noOptionsMessage={() => 'Категорії не знайдено'}
          styles={{
            menuList: (baseStyles) => ({
              ...baseStyles,
              maxHeight: isFullscreenOpen ? '300px' : '175px',
              transition: 'max-height .5s ease'
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: '#aaaaaa'
            }),
            control: (baseStyles) => ({
              ...baseStyles,
              boxSizing: 'border-box',
              height: '38px',
              border: errors[1].show ? '2px solid red' : 'none',
              color: '#333333',
              "&:hover": {
                border: errors[1].show ? '2px solid red' : 'none'
              }
            }),
            container: (baseStyles) => ({
              ...baseStyles,
              zIndex: 2,
              width: '85vw',
            })
          }}
          onChange={(e: OnChangeValue<SelectOption, false>) => {
            updateErrors(1, {
              message: '',
              show: false
            })
            changeEditedProduct('categoryId', e?.value ? +e.value : 0)
          }}
          onMenuOpen={() => {
            setTimeout(() => {
            document.getElementById('slideDownScrollPanel')?.scrollTo({
              top: 1
            })}, 10)
          }}
        />
      </div>
      <ImageInput error={errors[2]} theme="white" size="huge" image={image} 
        onSelect={(e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files ? e.target.files[0] : null
          setImage(file)
          changeEditedProduct('photo', file ? file.name : '')
          // setImage(e.target.files ? e.target.files[0] : null)
          // changeEditedProduct('photo', image?.name || '')
        }} 
        onDelete={() => {
          setImage(null)
          changeEditedProduct('photo', null)
        }} 
      />
      <TextInput error={errors[3]} label="Ціна" placeholder="Ціна" theme='white' size='big' inputType='singleLine' inputMode='numeric' value={editedProduct.price || ''} onValueChange={(e) => {changeEditedProduct('price', replaceSymbols(e.target.value))}} />
      <TextInput error={errors[4]} label="Вага" placeholder="Вага" theme='white' size='big' inputType='singleLine' value={editedProduct.weight || ''} onValueChange={(e) => changeEditedProduct('weight', replaceSymbols(e.target.value))} />
      <TextInput error={errors[5]} label="Опис" placeholder="Опис..." theme='white' size='big' inputType='multiLine' value={editedProduct.description} onValueChange={(e) => changeEditedProduct('description', e.target.value)} />
      
      {
        product ? 
        <div className={styles.buttonsContainer}>
          <Button text="Зберегти" theme="green" borders="square" onButtonClick={async () => {
            if (checkEditedProduct()) {
              createFormData()
              await AdminService.editProduct(formData)
              rerenderProductList()
              onButtonClick()
            }
            // changeEditedProduct('photo', editedProduct.photo ? (editedProduct.categoryId + '/' + editedProduct.photo) : null)
            // onButtonClick()
          }} />
          <Button text="Видалити" theme="red" borders="square" onButtonClick={() => {
            setConfirmationModalData({
              show: true,
              text: 'Це незворотна дія! \nВи впевнені?',
              onYesCallback: async () => {
                await AdminService.deleteProduct(product.id)
                clearConfirmationModalData()
                rerenderProductList()
                onButtonClick()
              },
              onNoCallback: () => {
                clearConfirmationModalData()
              }
            })
            // changeEditedProduct('photo', editedProduct.photo ? (editedProduct.categoryId + '/' + editedProduct.photo) : null)
            // onButtonClick()
          }} />
        </div> 
        :        
        <Button text="Додати" theme="red" borders="square" onButtonClick={async () => {
          if (checkEditedProduct()) {
            createFormData()
            await AdminService.createProduct(formData)
            rerenderProductList()
            onButtonClick()
          }
          // productStore.fetchProducts()
          // changeEditedProduct('phot}o', editedProduct.photo ? (editedProduct.categoryId + '/' + editedProduct.photo) : null)
          
        }} />
      }
    </div>
  )
}

export default observer(ProductEditForm)
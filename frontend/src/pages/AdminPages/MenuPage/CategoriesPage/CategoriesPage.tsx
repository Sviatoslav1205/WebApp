import UserService from "@/services/User.service"
import { SelectOption } from "@/types/SelectOption"
import { FC, useContext, useEffect, useState } from "react"
import Select, { OnChangeValue } from "react-select"
import styles from "./CategoriesPage.module.scss"
import Button from "@/components/Button"
import TextInput from "@/components/TextInput"
import AdminService from "@/services/Admin.service"
import { CustomError } from "@/types/CustomError"
import { AxiosError } from "axios"
import { Context } from "@/main"
import { observer } from "mobx-react-lite"

interface CategoriesPageProps {
  next: () => void
}

const CategoriesPage: FC<CategoriesPageProps> = ({ next }) => {
  const { productStore } = useContext(Context)
  const [isSelect, setIsSelect] = useState<boolean>(true)
  const [error, setError] = useState<CustomError>({
    message: '',
    show: false
  })

  const [options, setOptions] = useState<SelectOption[]>([])
  const getOptions = async () => {
    UserService.getCategories().then(response => {
      setOptions(response.data.categories.map(category => {
        return {
          value: category.id+'',
          label: category.name
        }
      }))
      productStore.setCategories(response.data.categories)
    })
  }

  useEffect(() => {
    getOptions()
  }, [])

  return (
    <>
      <h1 className={styles.h1}>Категорії</h1>
      <div className={styles.inputContainer}>
        {isSelect ?
          <div style={{position: 'relative', width: '85vw'}}>
            {error?.show && <span className={styles.errorMessage}>{error.message}</span>}
            <Select 
            placeholder='Категорія'
            options={options}
            noOptionsMessage={() => 'Категорії не знайдено'}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                boxSizing: 'border-box',
                height: '38px',
                border: error.show ? '2px solid red' : 'none',
                "&:hover": {
                  border: error.show ? '2px solid red' : 'none'
                }
              }),
              container: (baseStyles) => ({
                ...baseStyles,
                zIndex: 0,
                width: '85vw',
              })
            }}
            onChange={(e: OnChangeValue<SelectOption, false>) => {
              setError({
                message: '',
                show: false
              })
              productStore.setSelectedCategory({
                category: {
                  id: e?.value ? +e.value : 0,
                  name: e?.label || ''
                }, 
                next: productStore.selectedCategory.next
              })
            }}
          />
          </div>
          :
          <TextInput error={error} border={true} theme='white' size='big' inputType='singleLine' value={productStore.selectedCategory.category.name}
            onValueChange={(e: any) => {
              productStore.setSelectedCategory({
                category: {
                  id: 0,
                  name: e.target.value
                }, 
                next: productStore.selectedCategory.next
              })
              setError({
                message: '',
                show: false
              })
            }} placeholder='Назва категорії'
          />
        }

        <div className={styles.buttonsContainer}>
          <Button text={isSelect ? 'Додати нову' : 'Скасувати'} theme='red' size='small' onButtonClick={() => {
            productStore.setSelectedCategory({
              category: {
                id: 0,
                name: ''
              }, 
              next: productStore.selectedCategory.next
            })
            
            setIsSelect(!isSelect)
          }}/>
          <Button text='Далі' theme='grey' style={{width: '100px'}} onButtonClick={async () => {
            if (!productStore.selectedCategory.category.name) {
              setError({
                message: 'Заповніть поле',
                show: true
              })
              return
            }
            let errorOccurred = false
            if (!isSelect) {
              await AdminService.createCategory(productStore.selectedCategory.category.name)
                .then(response => productStore.setSelectedCategory({
                  category: response.data.category, 
                  next: productStore.selectedCategory.next
                }))
                .catch((e: AxiosError<{message: string}>) => {
                    setError({
                    message: e.response?.data.message || '',
                    show: true
                  })
                  errorOccurred = true
                })
            }
            if (!errorOccurred) {
              next()
            }
          }}/>
        </div>
      </div>
    </>
  )
}

export default observer(CategoriesPage)
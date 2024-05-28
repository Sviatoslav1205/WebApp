import { FC, useContext, useState } from "react"
import styles from "./CategoryEditForm.module.scss"
import TextInput from "../TextInput"
import AdminService from "@/services/Admin.service"
import { Context } from "@/main"
import Button from "../Button"

interface CategoryEditFormProps {
  text: string
  onButtonClick: () => void
}

const CategoryEditForm: FC<CategoryEditFormProps> = ({ text, onButtonClick }) => {
  const { productStore } = useContext(Context)
  const [inputValue, setInputValue] = useState<string>(text)
  return (
    <div className={styles.container}>
      <TextInput label="Назва" theme='white' size='big' inputType='singleLine' value={inputValue} onValueChange={(e) => setInputValue(e.target.value)} />
      <Button text='Зберегти' theme='red' borders='square' onButtonClick={() => {
        AdminService.editCategory(productStore.selectedCategory.category.id, inputValue)
        productStore.setSelectedCategory({
          category: {
            id: productStore.selectedCategory.category.id, 
            name: inputValue
          }, 
          next: productStore.selectedCategory.next
        })
        onButtonClick()
      }} />
    </div>
  )
}

export default CategoryEditForm
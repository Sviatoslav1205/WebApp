import { ChangeEvent, FC } from "react"
import styles from "./SearchInput.module.scss"
import TextInput from "@/components/TextInput"
import searchIcon from "@/images/searchIcon/searchIcon.svg"

interface SearchInputProps {
  value: string
  onValueChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const SearchInput: FC<SearchInputProps> = ({ value, onValueChange }) => {
  return (
    <div className={styles.searchInputContainer}>
      <TextInput theme="red" size="relative" isFocusEnabled={false} inputType="singleLine" 
        placeholder="Пошук по сайту" value={value} inputMode="search" onValueChange={onValueChange} 
      />
      <img src={searchIcon} alt="" />
    </div>
  )
}

export default SearchInput
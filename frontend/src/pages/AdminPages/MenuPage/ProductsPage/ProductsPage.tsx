import BackButton from "@/components/BackButton"
import { FC, useContext, useEffect, useState } from "react"
import styles from "./ProductsPage.module.scss"
import TextContainer from "@/components/TextContainer"
import ModalContainer from "@/components/ModalContainer"
import SlideDownModal from "@/components/SlideDownModal"
import { MenuModal } from "@/types/MenuModal"
import { Context } from "@/main"
import { observer } from "mobx-react-lite"
import ProductCard from "@/components/ProductCard"
import CategoryEditForm from "@/components/CategoryEditForm"
import ProductEditForm from "@/components/ProductEditForm"
import Button from "@/components/Button"
import ConfirmationModal from "@/components/ConfirmationModal"
import AdminService from "@/services/Admin.service"

interface ProductsPageProps {
  back: () => void
}

const ProductsPage: FC<ProductsPageProps> = ({ back }) => {
  const { productStore } = useContext(Context)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false)
  const [productAddTrigger, setProductAddTrigger] = useState<number>(0)
  const [isModalOpenAnimation, setIsModalOpenAnimation] = useState<boolean>(false)
  const [modal, setModal] = useState<MenuModal>({type: null, show: false})
  const [confirmationModalData, setConfirmationModalData] = useState<{
    show: boolean
    text: string
    onYesCallback: () => void
    onNoCallback: () => void
  }>({
    show: false,
    text: '',
    onYesCallback: () => {},
    onNoCallback: () => {}
  })

  useEffect(() => {
    productStore.fetchProducts()   
  }, [productAddTrigger])

  const clearConfirmationModalData = () => setConfirmationModalData({
    show: false,
    text: '',
    onYesCallback: () => {},
    onNoCallback: () => {}
  })

  return (
    <>
      <ModalContainer showModal={modal.show} onClose={() => {
        setIsModalOpenAnimation(false)
        setTimeout(() => {
          setModal({type: null, show: false})
        }, 300)
      }}>
        <SlideDownModal isFullscreenOpen={isFullscreenOpen} setIsFullscreenOpen={setIsFullscreenOpen} isModalOpenAnimation={isModalOpenAnimation} setIsModalOpenAnimation={setIsModalOpenAnimation}>
          {modal.type === 'changeName' ? 
            <CategoryEditForm 
              text={productStore.selectedCategory.category.name} 
              onButtonClick={() => setModal({type: null, show: false})} 
            /> 
            : 
            modal.type === 'product' ? 
              <ProductEditForm product={modal.productData} onButtonClick={() => setModal({type: null, show: false})} isFullscreenOpen={isFullscreenOpen} 
                rerenderProductList={() => setProductAddTrigger(productAddTrigger => productAddTrigger + 1)} setConfirmationModalData={setConfirmationModalData}
              />
              :
              null
          }
        </SlideDownModal>
      </ModalContainer>

      <ModalContainer showModal={confirmationModalData.show} onClose={clearConfirmationModalData} >
        <ConfirmationModal 
          text={confirmationModalData.text} 
          onYes={confirmationModalData.onYesCallback} 
          onNo={confirmationModalData.onNoCallback} 
        />
        {/* <ConfirmationModal text='Це незворотна дія! Ви впевнені?' onYes={() => {}} onNo={() => {}} /> */}
      </ModalContainer>

      <div className={styles.selectedCategory}>
        <div className={styles.name}>
          <BackButton theme="red" onButtonClick={back}/>
          <TextContainer text={productStore.selectedCategory.category.name} theme="red" />
        </div>
        <button className={styles.changeNameButton} onClick={() => setModal({type: 'changeName', show: true})}>Редагувати назву</button>
      </div>
      <div className={styles.productsContainer}>
        {productStore.getProductsByCategory().map(product => {
          return (
            <ProductCard product={product} onCardClick={() => setModal({
              type: 'product', 
              productData: JSON.parse(JSON.stringify( product, ["id", "categoryId", "name", "photo", "price", "weight", "description"])), 
              show: true
            })} key={product.id}/>
            // <ProductCard product={product} onCardClick={() => {console.log(())}} key={product.id}/>
          )
        })}
      </div>
      <div className={styles.buttonsContainer}>
        <Button text="Додати новий" theme="grey" borders="square" onButtonClick={() => setModal({type: 'product', show: true})} />
        <Button text="Видалити" theme="red" borders="square" onButtonClick={() => setConfirmationModalData({
          show: true,
          text: 'Це незворотна дія! \nБуде видалено усі товари з цієї категорії! \n\nВи впевнені?',
          onYesCallback: async () => {
            await AdminService.deleteCategory(productStore.selectedCategory.category.id)
            clearConfirmationModalData()
            back()
          },
          onNoCallback: () => {
            clearConfirmationModalData()
          }
        })} />
      </div>
    </>
  )
}

export default observer(ProductsPage)


// import BackButton from "@/components/BackButton";
// import { FC, useContext, useEffect, useState } from "react";
// import styles from "./ProductsPage.module.scss";
// import TextContainer from "@/components/TextContainer";
// import ModalContainer from "@/components/ModalContainer";
// import SlideDownModal from "@/components/SlideDownModal";
// import { MenuModal } from "@/types/MenuModal";
// import { Context } from "@/main";
// import { observer } from "mobx-react-lite";
// import ProductCard from "@/components/ProductCard";
// import CategoryEditForm from "@/components/CategoryEditForm";
// import ProductEditForm from "@/components/ProductEditForm";
// import Button from "@/components/Button";

// interface ProductsPageProps {
//   back: () => void;
// }

// const ProductsPage: FC<ProductsPageProps> = ({ back }) => {
//   const { productStore } = useContext(Context);
//   const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);
//   const [productAddTrigger, setProductAddTrigger] = useState<number>(0);
//   const [isModalOpenAnimation, setIsModalOpenAnimation] = useState<boolean>(false);
//   const [modal, setModal] = useState<MenuModal>({ type: null, show: false });

//   useEffect(() => {
//     productStore.fetchProducts();
//     console.log("fetch product");
//     console.log(productStore);
//   }, [productAddTrigger, productStore]);

//   return (
//     <>
//       <ModalContainer
//         showModal={modal.show}
//         onClose={() => {
//           setIsModalOpenAnimation(false);
//           setTimeout(() => {
//             setModal({ type: null, show: false });
//           }, 300);
//         }}
//       >
//         <SlideDownModal
//           isFullscreenOpen={isFullscreenOpen}
//           setIsFullscreenOpen={setIsFullscreenOpen}
//           isModalOpenAnimation={isModalOpenAnimation}
//           setIsModalOpenAnimation={setIsModalOpenAnimation}
//         >
//           {modal.type === "changeName" ? (
//             <CategoryEditForm
//               text={productStore.selectedCategory.category.name}
//               onButtonClick={() => setModal({ type: null, show: false })}
//             />
//           ) : modal.type === "product" ? (
//             <ProductEditForm
//               product={modal.productData}
//               onButtonClick={() => setModal({ type: null, show: false })}
//               isFullscreenOpen={isFullscreenOpen}
//               rerenderParent={() =>
//                 setProductAddTrigger((productAddTrigger) => productAddTrigger + 1)
//               }
//             />
//           ) : null}
//         </SlideDownModal>
//       </ModalContainer>

//       <div className={styles.selectedCategory}>
//         <div className={styles.name}>
//           <BackButton theme="red" onButtonClick={back} />
//           <TextContainer text={productStore.selectedCategory.category.name} theme="red" />
//         </div>
//         <button
//           className={styles.changeNameButton}
//           onClick={() => setModal({ type: "changeName", show: true })}
//         >
//           Редагувати назву
//         </button>
//       </div>
//       <div className={styles.productsContainer}>
//         {productStore.getProductsByCategory().map((product) => (
//           <ProductCard
//             product={product}
//             onCardClick={() =>
//               setModal({
//                 type: "product",
//                 productData: JSON.parse(
//                   JSON.stringify(product, [
//                     "id",
//                     "categoryId",
//                     "name",
//                     "photo",
//                     "price",
//                     "weight",
//                     "description",
//                   ])
//                 ),
//                 show: true,
//               })
//             }
//             key={product.id}
//           />
//         ))}
//       </div>
//       <div className={styles.buttonsContainer}>
//         <button onClick={() => setProductAddTrigger((productAddTrigger) => productAddTrigger + 1)}>
//           update
//         </button>
//         <Button
//           text="Додати новий"
//           theme="grey"
//           borders="square"
//           onButtonClick={() => setModal({ type: "product", show: true })}
//         />
//         <Button text="Видалити" theme="red" borders="square" onButtonClick={() => {}} />
//       </div>
//     </>
//   );
// };

// export default observer(ProductsPage);
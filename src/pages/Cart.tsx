import { useAppDispatch, useAppSelector } from '../app/hooks'
import Card from '../components/Card'
import { Product, VoidFunc } from '../models/models'
import { removeCarts } from '../features/productsSlice'
import { toastSuccessNotify } from '../helper/ToastNotify'

const FavoritesPage = () => {
  //! stateden sepete atlan ürünlerin listesini aldık
  const data = useAppSelector(state => state.products.carts)
  const dispatch = useAppDispatch();
  // console.log(data)
  //! tür tanımlamalarını yaptıktan sonra seçilen item id si dısındaki tüm ürünleri basıyoruz yani seçilen idyi sileriz.
  const handleRemove:VoidFunc = (product) => {
    const newData:Product[] = data.filter(item=> item.id !== product.id)
    dispatch(removeCarts(newData));
    toastSuccessNotify("Products removed from carts ...")
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-white text-center m-3">
        My Shopping carts
      </h1>
      <div className="flex justify-center items-center flex-wrap gap-5 p-5">
        {data.map((item) => (
          <Card
            key={item.id}
            text="Remove from Cart"
            item={item}
            handleFunc={handleRemove}
          />
        ))}
        {data.length === 0 && (
          <h3 className="font-bold text-2xl text-red-500 text-center mt-52">
           There is no products :( 
          </h3>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage
import Modal from "../useModal/modal";
import { useDispatch } from "react-redux";
import { flagStatus, afterDelete } from "../../../redux/postSlice";

// typescript interface
export interface Props {
  isShowing: Boolean;
  toggle: any;
  selectedId: number;
}
const DeletePost = ({ isShowing, toggle, selectedId }: Props) => {
  // get data from localhost

  let getlocalstorageData: any = localStorage.getItem("posts");
  let parsedData = JSON.parse(getlocalstorageData);
  const dispatch = useDispatch();
  const deleteItem = () => {
    let remained = parsedData.filter((item: any) => selectedId !== item.id);
    localStorage.setItem("posts", JSON.stringify(remained));
    dispatch(afterDelete(remained));

    // make flag for get localhost from remained posts not from fakse json while rendering

    dispatch(flagStatus(false));
    toggle();
  };

  return (
    <Modal
      isShowing={isShowing}
      hide={toggle}
      title="Вы уверены, что хотите удалить этот пост?"
    >
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div className="form-group" style={{ paddingRight: "10px" }}>
          <button onClick={deleteItem} type="submit">
            Да
          </button>
        </div>
        <div className="form-group">
          <button onClick={toggle}>Нет</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePost;

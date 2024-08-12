//you probably need to use [modal,setModal] to open and close the modal in whatever file you use it on

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  styling?: string;
  mainComponent: JSX.Element;
}

const ModalTemplate = ({
  showModal,
  onClose,
  styling,
  mainComponent,
}: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-siah/40 ${showModal ? "visible bg-siah/40" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center justify-center rounded-3xl border-khakeshtari-400 bg-khakeshtari-100 px-[90px] py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {mainComponent}
      </div>
    </div>
  );
};

export default ModalTemplate;
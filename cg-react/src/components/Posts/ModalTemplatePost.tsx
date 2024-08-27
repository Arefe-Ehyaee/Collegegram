interface ModalPostProps {
  showModal: boolean;
  onClose?: () => void;
  styling?: string;
  mainComponent?: JSX.Element;
  children?:React.ReactNode
}

const ModalTemplatePost = ({
  showModal,
  onClose,
  styling,
  mainComponent,
  children
}: ModalPostProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-siah/40 ${showModal ? "visible bg-siah/40" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center justify-center rounded-3xl border-khakeshtari-400 bg-khakeshtari-100 px-[35px] py-16"
        onClick={(e) => e.stopPropagation()}
      >
        {mainComponent}{children}
      </div>
    </div>
  );
};

export default ModalTemplatePost;

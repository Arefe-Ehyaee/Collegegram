interface RahnemaBackProps {
    children?: React.ReactNode;
}

const RahnemaBack: React.FC<RahnemaBackProps> = ({ children }) => {
  return (
    <div className="backImg flex min-h-full items-center justify-center">
        {children}
    </div>
  );
};

export default RahnemaBack;

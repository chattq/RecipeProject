import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Modal } from "antd";
import Slider from "react-slick";
import { Instructions_Images } from "../../../../packages/types/product.type";
import { nanoid } from "nanoid";

export interface ModalInstructionImageRef {
  showModal: (index: number, data: any) => void;
}

export const ModalInstructionImage = forwardRef<ModalInstructionImageRef, {}>(
  ({ currentIndex }: any, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const slickRef = useRef<Slider>(null);
    const [listImage, setListImage] = useState<Instructions_Images[]>([]);

    useImperativeHandle(ref, () => ({
      showModal: (index, data) => {
        setTimeout(() => {
          setListImage(data);
          slickRef.current?.slickGoTo(index);
        }, 0);

        setIsModalOpen(true);
      },
    }));

    const handleCancel = useCallback(() => {
      setIsModalOpen(false);
    }, [isModalOpen]);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: currentIndex,
    };

    return (
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}
        closeIcon={<></>}>
        <div className="slider-container">
          <Slider ref={slickRef} {...settings}>
            {listImage &&
              listImage?.map((item) => {
                return (
                  <div key={nanoid()}>
                    <img
                      src={item.instruction_image_image}
                      alt={item.instruction_image_image}
                      className="object-contain"
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
      </Modal>
    );
  }
);

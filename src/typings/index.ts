import * as yup from 'yup';
enum EFormErrors {
  REQUIRED = 'El campo es requerido',
  INVALID_URL = 'La URL no es válida',
}

export const TUserSchema = yup.object().shape({
  createdAt: yup.date(),
  name: yup.string().trim().required(EFormErrors.REQUIRED).min(1),
  avatar: yup.string().trim().required(EFormErrors.REQUIRED).min(1),
  description: yup.string().trim().required(EFormErrors.REQUIRED).min(1),
  website: yup.string().trim().url(EFormErrors.INVALID_URL).required(EFormErrors.REQUIRED),
  id: yup.string().trim().required(EFormErrors.REQUIRED).min(1),
  operationId: yup.string().trim().optional(),
  documentType: yup.string().trim().optional(),
  documentNumber: yup.string().trim().optional(),
  productNumber: yup.string().trim().optional(),
  user: yup.string().trim().optional(),
  origin: yup.string().trim().optional(),
  option: yup.string().trim().optional(),
  contactMode: yup.string().trim().optional(),
  productCode: yup.string().trim().optional(),
  causeCode: yup.string().trim().optional(),
  reasoncode: yup.string().trim().optional(),
  companyCode: yup.string().trim().optional(),
  responsibleSector: yup.string().trim().optional(),
  registerSector: yup.string().trim().optional(),
  initContact: yup.string().trim().optional(),
  closeContact: yup.string().trim().optional(),
  embozo: yup.string().trim().optional(),
  category: yup.string().trim().optional(),
  domicilio: yup.string().trim().optional(),
  sucursal: yup.string().trim().optional(),
  requestNumber: yup.string().trim().optional(),
});

export type TUser = yup.InferType<typeof TUserSchema>;

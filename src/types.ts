// Please update this type as same as with the data shape.
type File = {
  id: string;
  name: string;
};

export type List = File & {
  files: File[];
};

export enum ErrorDesc {
  CantMoveFolder = 'You cannot move a folder',
  SourceNotFound = 'Given source not found',
  DestinationNotFound = 'You cannot specify a file as the destination',
  InSomeDestination = 'Given source in some destination',
}

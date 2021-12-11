import { List, ErrorDesc } from './types';

const lookupFiles = (list: List[], source: string, destination: string) => {
  const indexs = {
    destinationIndex: -1,
    sourceFolderIndex: -1,
    sourceFileIndex: -1,
  };

  list.forEach((folder, folderIndex) => {
    // is source a folder ?
    if (folder.id === source) throw Error(ErrorDesc.CantMoveFolder);

    // set destinationIndex
    if (folder.id === destination) indexs.destinationIndex = folderIndex;

    // Run findIndex only if not setted sourceFileIndex
    if (indexs.sourceFileIndex === -1) {
      indexs.sourceFileIndex = folder.files?.findIndex((file) => file.id === source);
      indexs.sourceFolderIndex = folderIndex;
    }
  });

  return indexs;
};

export default function move(list: List[], source: string, destination: string): List[] {
  const { destinationIndex, sourceFolderIndex, sourceFileIndex } = lookupFiles(
    list,
    source,
    destination,
  );

  // The order of conditions is important
  if (destinationIndex === -1) throw Error(ErrorDesc.DestinationNotFound);
  if (sourceFileIndex === -1) throw Error(ErrorDesc.SourceNotFound);
  if (sourceFolderIndex === destinationIndex) throw Error(ErrorDesc.InSomeDestination);

  /** Move File To Destination */
  const sourceFile = list[sourceFolderIndex].files.splice(sourceFileIndex, 1);
  list[destinationIndex].files.push(...sourceFile);

  return list;
}

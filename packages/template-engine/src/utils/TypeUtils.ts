export interface IndexableType {
  [index:string]: string;
}

export interface FileSystemStructure {
  [index: string]: FileSystemStructure | Leaf;
}

// export type FileSystemStructure = IndexableType | Leaf;
export type Leaf = string;
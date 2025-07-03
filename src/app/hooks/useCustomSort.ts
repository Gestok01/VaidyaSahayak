const useCustomSort = <T extends { price: number }>(arr: T[]): T[] => {
    return [...arr].sort((a, b) => a.price - b.price);
  };
  
  export default useCustomSort;
  
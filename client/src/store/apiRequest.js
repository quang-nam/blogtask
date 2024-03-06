export const fetchCategory = async (axiosJwt, accessToken, setData) => {
  try {
    const res = await axiosJwt.get("/api/category", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const categoryList = await res.data;
    setData(categoryList);
  } catch (error) {
    console.log("Error fetching data:" + error.message);
  }
};

export const fetchCardList = async (
  axiosJwt,
  page,
  cat,
  accessToken,
  setData,
  setHasPrev,
  setHasNext
) => {
  try {
    const res = await axiosJwt.get(
      `/api/post?page=${page}&category=${cat || ""}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setData(res.data);
    const { count } = res.data;
    const POST_PER_PAGE = 2;
    const currentPageStartIndex = POST_PER_PAGE * (page - 1);
    setHasPrev(currentPageStartIndex > 0);
    setHasNext(currentPageStartIndex + POST_PER_PAGE < count);
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleBlog = async (
  axiosJwt,
  accessToken,
  setPostData,
  id
) => {
  try {
    const res = await axiosJwt.get(`/api/post/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = res.data;
    setPostData(data);
  } catch (error) {
    console.log(error);
  }
};

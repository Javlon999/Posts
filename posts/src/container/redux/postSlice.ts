import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

//  initialState defination with typescript interface 

export interface CounterState {
  posts: [];
  localData: [];
  afterDeleted: any;
  flag:Boolean,
  updatedPost: any;
  addedposts: any;
  postById: { title?: string; body?: string; id?: number };
  filteredPosts: [];
  commentsPosts: [];
  value: number;
  status: "idle" | "success" | "loading" | "failed";
  statusFilter: "idle" | "success" | "loading" | "failed";
}
//  initialState 
const initialState: CounterState = {
  posts: [],
  localData: [],
  afterDeleted:[],
  flag:true,
  updatedPost:[],
  addedposts: [],
  postById: {},
  filteredPosts: [],
  commentsPosts: [],
  value: 0,
  status: "idle",
  statusFilter: "idle",
};

//posting, updating , getting api requests asynchronously from fake json 

export const addPost = createAsyncThunk("posts/add", async (data: any) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    { body: data },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.data;
});

export const updatePost = createAsyncThunk("posts/update", async (data: any) => {
  let id=data?.id
  const response = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`, {
    body: data
  },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.data
})

export const deletePost = createAsyncThunk("posts/delete", async (id: any) => {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response;
});

export const getPosts = createAsyncThunk("posts/fetch", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
});

export const selectedPost = createAsyncThunk(
  "posts/selected",
  async (postId: any) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return response.data;
  }
);
export const searchPosts = createAsyncThunk(
  "posts/search",
  async (userId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return response.data;
  }
);

export const comments = createAsyncThunk(
  "posts/comments",
  async (commendId: any) => {
    let id = parseInt(commendId);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    return response.data;
  }
);

// there are 2 reducers simple reducer and extra reducer 
export const counterSlice = createSlice({
  name: "posts",
  initialState,
 
  reducers: {
    storeData: (state, action) => {
      state.localData = action.payload;
    },
    flagStatus: (state, action) => {
      state.flag = action.payload;
    },
    afterDelete: (state, action) => {
      state.afterDeleted = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = "failed";
        state.posts = [];
      })
      .addCase(searchPosts.pending, (state) => {
        state.statusFilter = "loading";
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.statusFilter = "success";
        state.filteredPosts = action.payload;
      })
      .addCase(searchPosts.rejected, (state) => {
        state.statusFilter = "failed";
        state.filteredPosts = [];
      })
      .addCase(comments.rejected, (state, action) => {
        state.commentsPosts = [];
      })
      .addCase(comments.fulfilled, (state, action) => {
        state.commentsPosts = action.payload;
      })
      .addCase(selectedPost.rejected, (state) => {
        state.postById = {};
      })
      .addCase(selectedPost.fulfilled, (state, action) => {
        state.postById = action.payload;
      })
 
      .addCase(addPost.fulfilled, (state, action) => {
        let data = {

          userId: action.payload.body.userId,
          body: action.payload.body.body,
          title: action.payload.body.title,
        };
        console.log('reduxData',data)
        state.addedposts.push(data);
      })
    .addCase(updatePost.rejected, (state) => {
      state.posts = [];
    }).addCase(updatePost.fulfilled, (state, action) => {
      let data = {
        userId: action.payload.body.userId,
        id: action.payload.id,
        title: action.payload.body.title,
        body: action.payload.body.body,
      };
      state.updatedPost.push(data);
    })
  },
});

export const { flagStatus, storeData,afterDelete } =
  counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// naming state to call in useSelector by its names 
export const allposts = (state: RootState) => state.posts.posts;
export const addedposts = (state: RootState) => state.posts.addedposts;
export const allStatus = (state: RootState) => state.posts.status;
export const allFilteredPosts = (state: RootState) => state.posts.filteredPosts;
export const filterStatus = (state: RootState) => state.posts.statusFilter;
export const commentbyId = (state: RootState) => state.posts.commentsPosts;
export const postId = (state: RootState) => state.posts.postById;
export const storageState = (state: RootState) => state.posts.localData;
export const updatedPost = (state: RootState) => state.posts.updatedPost;
export const flagState = (state: RootState) => state.posts.flag;
export const remainedPosts=(state:RootState)=>state.posts.afterDeleted
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default counterSlice.reducer;

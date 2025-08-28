/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search by multiple fields
  search(searchableFields: string[]) {
    const searchTerm = (this.query?.searchTerm as string)?.trim() || "";
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) =>
          field === "ingredients"
            ? { ingredients: { $in: [new RegExp(searchTerm, "i")] } }
            : { [field]: { $regex: searchTerm, $options: "i" } }
        ),
      });
    }
    return this;
  }

  // Filter fields (excluding control fields)
  filter() {
    const queryObj = { ...this.query } as Record<string, any>;
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Handle availability filter if exists
    if (this.query.availability === "Available") queryObj.availability = true;
    if (this.query.availability === "Not Available") queryObj.availability = false;
    if (this.query.availability === "All") delete queryObj.availability;

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // Sort
  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort === "h2l" ? "-ratings" : "ratings";
      this.modelQuery = this.modelQuery.sort(sortBy);
    }
    return this;
  }

  // Pagination
  paginate() {
    const page = Math.max(Number(this.query.page) || 1, 1);
    const limit = Math.max(Number(this.query.limit) || 10, 1); // default 10
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  // Select fields
  fields() {
    const fields = (this.query.fields as string)?.split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Get metadata
  async getMetaData() {
    const countQuery = this.modelQuery.clone(); // clone for count
    const totalCount = await countQuery.countDocuments();
    const limit = Math.max(Number(this.query.limit) || 10, 1);
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.max(Number(this.query.page) || 1, 1);

    return {
      totalCount,
      page: currentPage,
      limit,
      totalPages,
    };
  }
}

export default QueryBuilder;

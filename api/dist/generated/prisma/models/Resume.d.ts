import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ResumeModel = runtime.Types.Result.DefaultSelection<Prisma.$ResumePayload>;
export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null;
    _avg: ResumeAvgAggregateOutputType | null;
    _sum: ResumeSumAggregateOutputType | null;
    _min: ResumeMinAggregateOutputType | null;
    _max: ResumeMaxAggregateOutputType | null;
};
export type ResumeAvgAggregateOutputType = {
    sizeBytes: number | null;
    attempts: number | null;
};
export type ResumeSumAggregateOutputType = {
    sizeBytes: number | null;
    attempts: number | null;
};
export type ResumeMinAggregateOutputType = {
    id: string | null;
    originalName: string | null;
    filePath: string | null;
    sizeBytes: number | null;
    status: $Enums.ResumeStatus | null;
    extractedText: string | null;
    attempts: number | null;
    error: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResumeMaxAggregateOutputType = {
    id: string | null;
    originalName: string | null;
    filePath: string | null;
    sizeBytes: number | null;
    status: $Enums.ResumeStatus | null;
    extractedText: string | null;
    attempts: number | null;
    error: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResumeCountAggregateOutputType = {
    id: number;
    originalName: number;
    filePath: number;
    sizeBytes: number;
    status: number;
    extractedText: number;
    summary: number;
    attempts: number;
    error: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ResumeAvgAggregateInputType = {
    sizeBytes?: true;
    attempts?: true;
};
export type ResumeSumAggregateInputType = {
    sizeBytes?: true;
    attempts?: true;
};
export type ResumeMinAggregateInputType = {
    id?: true;
    originalName?: true;
    filePath?: true;
    sizeBytes?: true;
    status?: true;
    extractedText?: true;
    attempts?: true;
    error?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResumeMaxAggregateInputType = {
    id?: true;
    originalName?: true;
    filePath?: true;
    sizeBytes?: true;
    status?: true;
    extractedText?: true;
    attempts?: true;
    error?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResumeCountAggregateInputType = {
    id?: true;
    originalName?: true;
    filePath?: true;
    sizeBytes?: true;
    status?: true;
    extractedText?: true;
    summary?: true;
    attempts?: true;
    error?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ResumeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResumeWhereInput;
    orderBy?: Prisma.ResumeOrderByWithRelationInput | Prisma.ResumeOrderByWithRelationInput[];
    cursor?: Prisma.ResumeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ResumeCountAggregateInputType;
    _avg?: ResumeAvgAggregateInputType;
    _sum?: ResumeSumAggregateInputType;
    _min?: ResumeMinAggregateInputType;
    _max?: ResumeMaxAggregateInputType;
};
export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
    [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateResume[P]> : Prisma.GetScalarType<T[P], AggregateResume[P]>;
};
export type ResumeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResumeWhereInput;
    orderBy?: Prisma.ResumeOrderByWithAggregationInput | Prisma.ResumeOrderByWithAggregationInput[];
    by: Prisma.ResumeScalarFieldEnum[] | Prisma.ResumeScalarFieldEnum;
    having?: Prisma.ResumeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ResumeCountAggregateInputType | true;
    _avg?: ResumeAvgAggregateInputType;
    _sum?: ResumeSumAggregateInputType;
    _min?: ResumeMinAggregateInputType;
    _max?: ResumeMaxAggregateInputType;
};
export type ResumeGroupByOutputType = {
    id: string;
    originalName: string;
    filePath: string;
    sizeBytes: number;
    status: $Enums.ResumeStatus;
    extractedText: string | null;
    summary: runtime.JsonValue | null;
    attempts: number;
    error: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ResumeCountAggregateOutputType | null;
    _avg: ResumeAvgAggregateOutputType | null;
    _sum: ResumeSumAggregateOutputType | null;
    _min: ResumeMinAggregateOutputType | null;
    _max: ResumeMaxAggregateOutputType | null;
};
export type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ResumeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ResumeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ResumeGroupByOutputType[P]>;
}>>;
export type ResumeWhereInput = {
    AND?: Prisma.ResumeWhereInput | Prisma.ResumeWhereInput[];
    OR?: Prisma.ResumeWhereInput[];
    NOT?: Prisma.ResumeWhereInput | Prisma.ResumeWhereInput[];
    id?: Prisma.StringFilter<"Resume"> | string;
    originalName?: Prisma.StringFilter<"Resume"> | string;
    filePath?: Prisma.StringFilter<"Resume"> | string;
    sizeBytes?: Prisma.IntFilter<"Resume"> | number;
    status?: Prisma.EnumResumeStatusFilter<"Resume"> | $Enums.ResumeStatus;
    extractedText?: Prisma.StringNullableFilter<"Resume"> | string | null;
    summary?: Prisma.JsonNullableFilter<"Resume">;
    attempts?: Prisma.IntFilter<"Resume"> | number;
    error?: Prisma.StringNullableFilter<"Resume"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Resume"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Resume"> | Date | string;
};
export type ResumeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    extractedText?: Prisma.SortOrderInput | Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ResumeWhereInput | Prisma.ResumeWhereInput[];
    OR?: Prisma.ResumeWhereInput[];
    NOT?: Prisma.ResumeWhereInput | Prisma.ResumeWhereInput[];
    originalName?: Prisma.StringFilter<"Resume"> | string;
    filePath?: Prisma.StringFilter<"Resume"> | string;
    sizeBytes?: Prisma.IntFilter<"Resume"> | number;
    status?: Prisma.EnumResumeStatusFilter<"Resume"> | $Enums.ResumeStatus;
    extractedText?: Prisma.StringNullableFilter<"Resume"> | string | null;
    summary?: Prisma.JsonNullableFilter<"Resume">;
    attempts?: Prisma.IntFilter<"Resume"> | number;
    error?: Prisma.StringNullableFilter<"Resume"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Resume"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Resume"> | Date | string;
}, "id">;
export type ResumeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    extractedText?: Prisma.SortOrderInput | Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ResumeCountOrderByAggregateInput;
    _avg?: Prisma.ResumeAvgOrderByAggregateInput;
    _max?: Prisma.ResumeMaxOrderByAggregateInput;
    _min?: Prisma.ResumeMinOrderByAggregateInput;
    _sum?: Prisma.ResumeSumOrderByAggregateInput;
};
export type ResumeScalarWhereWithAggregatesInput = {
    AND?: Prisma.ResumeScalarWhereWithAggregatesInput | Prisma.ResumeScalarWhereWithAggregatesInput[];
    OR?: Prisma.ResumeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ResumeScalarWhereWithAggregatesInput | Prisma.ResumeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Resume"> | string;
    originalName?: Prisma.StringWithAggregatesFilter<"Resume"> | string;
    filePath?: Prisma.StringWithAggregatesFilter<"Resume"> | string;
    sizeBytes?: Prisma.IntWithAggregatesFilter<"Resume"> | number;
    status?: Prisma.EnumResumeStatusWithAggregatesFilter<"Resume"> | $Enums.ResumeStatus;
    extractedText?: Prisma.StringNullableWithAggregatesFilter<"Resume"> | string | null;
    summary?: Prisma.JsonNullableWithAggregatesFilter<"Resume">;
    attempts?: Prisma.IntWithAggregatesFilter<"Resume"> | number;
    error?: Prisma.StringNullableWithAggregatesFilter<"Resume"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Resume"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Resume"> | Date | string;
};
export type ResumeCreateInput = {
    id?: string;
    originalName: string;
    filePath: string;
    sizeBytes: number;
    status?: $Enums.ResumeStatus;
    extractedText?: string | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    attempts?: number;
    error?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResumeUncheckedCreateInput = {
    id?: string;
    originalName: string;
    filePath: string;
    sizeBytes: number;
    status?: $Enums.ResumeStatus;
    extractedText?: string | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    attempts?: number;
    error?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResumeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumResumeStatusFieldUpdateOperationsInput | $Enums.ResumeStatus;
    extractedText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResumeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumResumeStatusFieldUpdateOperationsInput | $Enums.ResumeStatus;
    extractedText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResumeCreateManyInput = {
    id?: string;
    originalName: string;
    filePath: string;
    sizeBytes: number;
    status?: $Enums.ResumeStatus;
    extractedText?: string | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    attempts?: number;
    error?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResumeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumResumeStatusFieldUpdateOperationsInput | $Enums.ResumeStatus;
    extractedText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResumeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    originalName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumResumeStatusFieldUpdateOperationsInput | $Enums.ResumeStatus;
    extractedText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    summary?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResumeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    extractedText?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResumeAvgOrderByAggregateInput = {
    sizeBytes?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
};
export type ResumeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    extractedText?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResumeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    originalName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    extractedText?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResumeSumOrderByAggregateInput = {
    sizeBytes?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumResumeStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResumeStatus;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ResumeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalName?: boolean;
    filePath?: boolean;
    sizeBytes?: boolean;
    status?: boolean;
    extractedText?: boolean;
    summary?: boolean;
    attempts?: boolean;
    error?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["resume"]>;
export type ResumeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalName?: boolean;
    filePath?: boolean;
    sizeBytes?: boolean;
    status?: boolean;
    extractedText?: boolean;
    summary?: boolean;
    attempts?: boolean;
    error?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["resume"]>;
export type ResumeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    originalName?: boolean;
    filePath?: boolean;
    sizeBytes?: boolean;
    status?: boolean;
    extractedText?: boolean;
    summary?: boolean;
    attempts?: boolean;
    error?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["resume"]>;
export type ResumeSelectScalar = {
    id?: boolean;
    originalName?: boolean;
    filePath?: boolean;
    sizeBytes?: boolean;
    status?: boolean;
    extractedText?: boolean;
    summary?: boolean;
    attempts?: boolean;
    error?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ResumeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "originalName" | "filePath" | "sizeBytes" | "status" | "extractedText" | "summary" | "attempts" | "error" | "createdAt" | "updatedAt", ExtArgs["result"]["resume"]>;
export type $ResumePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Resume";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        originalName: string;
        filePath: string;
        sizeBytes: number;
        status: $Enums.ResumeStatus;
        extractedText: string | null;
        summary: runtime.JsonValue | null;
        attempts: number;
        error: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["resume"]>;
    composites: {};
};
export type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ResumePayload, S>;
export type ResumeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ResumeCountAggregateInputType | true;
};
export interface ResumeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Resume'];
        meta: {
            name: 'Resume';
        };
    };
    findUnique<T extends ResumeFindUniqueArgs>(args: Prisma.SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ResumeFindFirstArgs>(args?: Prisma.SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ResumeFindManyArgs>(args?: Prisma.SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ResumeCreateArgs>(args: Prisma.SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ResumeCreateManyArgs>(args?: Prisma.SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ResumeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ResumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ResumeDeleteArgs>(args: Prisma.SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ResumeUpdateArgs>(args: Prisma.SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ResumeDeleteManyArgs>(args?: Prisma.SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ResumeUpdateManyArgs>(args: Prisma.SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ResumeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ResumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ResumeUpsertArgs>(args: Prisma.SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma.Prisma__ResumeClient<runtime.Types.Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ResumeCountArgs>(args?: Prisma.Subset<T, ResumeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ResumeCountAggregateOutputType> : number>;
    aggregate<T extends ResumeAggregateArgs>(args: Prisma.Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>;
    groupBy<T extends ResumeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ResumeGroupByArgs['orderBy'];
    } : {
        orderBy?: ResumeGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ResumeFieldRefs;
}
export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ResumeFieldRefs {
    readonly id: Prisma.FieldRef<"Resume", 'String'>;
    readonly originalName: Prisma.FieldRef<"Resume", 'String'>;
    readonly filePath: Prisma.FieldRef<"Resume", 'String'>;
    readonly sizeBytes: Prisma.FieldRef<"Resume", 'Int'>;
    readonly status: Prisma.FieldRef<"Resume", 'ResumeStatus'>;
    readonly extractedText: Prisma.FieldRef<"Resume", 'String'>;
    readonly summary: Prisma.FieldRef<"Resume", 'Json'>;
    readonly attempts: Prisma.FieldRef<"Resume", 'Int'>;
    readonly error: Prisma.FieldRef<"Resume", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Resume", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Resume", 'DateTime'>;
}
export type ResumeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    where: Prisma.ResumeWhereUniqueInput;
};
export type ResumeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    where: Prisma.ResumeWhereUniqueInput;
};
export type ResumeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    where?: Prisma.ResumeWhereInput;
    orderBy?: Prisma.ResumeOrderByWithRelationInput | Prisma.ResumeOrderByWithRelationInput[];
    cursor?: Prisma.ResumeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ResumeScalarFieldEnum | Prisma.ResumeScalarFieldEnum[];
};
export type ResumeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    where?: Prisma.ResumeWhereInput;
    orderBy?: Prisma.ResumeOrderByWithRelationInput | Prisma.ResumeOrderByWithRelationInput[];
    cursor?: Prisma.ResumeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ResumeScalarFieldEnum | Prisma.ResumeScalarFieldEnum[];
};
export type ResumeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    where?: Prisma.ResumeWhereInput;
    orderBy?: Prisma.ResumeOrderByWithRelationInput | Prisma.ResumeOrderByWithRelationInput[];
    cursor?: Prisma.ResumeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ResumeScalarFieldEnum | Prisma.ResumeScalarFieldEnum[];
};
export type ResumeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ResumeCreateInput, Prisma.ResumeUncheckedCreateInput>;
};
export type ResumeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ResumeCreateManyInput | Prisma.ResumeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ResumeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    data: Prisma.ResumeCreateManyInput | Prisma.ResumeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ResumeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ResumeUpdateInput, Prisma.ResumeUncheckedUpdateInput>;
    where: Prisma.ResumeWhereUniqueInput;
};
export type ResumeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ResumeUpdateManyMutationInput, Prisma.ResumeUncheckedUpdateManyInput>;
    where?: Prisma.ResumeWhereInput;
    limit?: number;
};
export type ResumeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ResumeUpdateManyMutationInput, Prisma.ResumeUncheckedUpdateManyInput>;
    where?: Prisma.ResumeWhereInput;
    limit?: number;
};
export type ResumeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    where: Prisma.ResumeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResumeCreateInput, Prisma.ResumeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ResumeUpdateInput, Prisma.ResumeUncheckedUpdateInput>;
};
export type ResumeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
    where: Prisma.ResumeWhereUniqueInput;
};
export type ResumeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResumeWhereInput;
    limit?: number;
};
export type ResumeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ResumeSelect<ExtArgs> | null;
    omit?: Prisma.ResumeOmit<ExtArgs> | null;
};

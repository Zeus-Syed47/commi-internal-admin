"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { updateUserOfACompany } from "@/api/users";
import { toast } from "react-toastify";
import { getLocaleString } from "@/utils/getLocale";
import { getPipelineContacts } from "@/api/piepline";
import { Card, KanbanBoard, moveCard, OnDragEndNotification, } from '@caldwell619/react-kanban'
import { updateContact } from "@/api/contacts";


function usePipeline() {

    const initialBoard: KanbanBoard = {
        columns: [
            {
                id: 1,
                key: 'qualified',
                title: 'Qualified',
                cards: []
            },
            {
                id: 2,
                key: 'contact_made',
                title: 'Contact Made',
                cards: []
            },
            {
                id: 3,
                key: 'demo_scheduled',
                title: 'Demo Scheduled',
                cards: []
            },
            {
                id: 4,
                key: 'proposal_made',
                title: 'Proposal made',
                cards: []
            },
            {
                id: 6,
                key: 'deal_won',
                title: 'Deal won',
                cards: []
            },
            {
                id: 7,
                key: 'deal_lost',
                title: 'Deal lost',
                cards: [
                    // {
                    //     id: 17,
                    //     title: 'Add card',
                    //     description: 'Add capability to add a card in a column'
                    // },
                ]
            }
        ]
    }

    const [board, setBoard] = useState<KanbanBoard>(initialBoard)

    const router = useRouter();

    const currentUser = useStore((state) => state?.currentUser);


    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['getPipelineContacts'],
        queryFn: () => {
            return getPipelineContacts({
                waba_meta_id: currentUser?.company?.wabas[0]?.waba_meta_id,
            })
        },
        enabled: !!currentUser?.id,
    })

    console.log('data', data)


    const { mutate: updateContactApi, isPending: isContactUpdating } =
        useMutation({
            mutationKey: ["updateContact"],
            mutationFn: updateContact,
            onSuccess(data, variables, context) {
                if (data) {
                    refetch();
                }
            },
        });

    useEffect(() => {
        if (Object.keys(data?.data?.rows ?? {})?.length > 0) {
            let board = [];
            let qualified = {
                id: 1,
                key: 'qualified',
                title: 'Qualified',
                cards: []
            }
            let contact_made = {
                id: 2,
                key: 'contact_made',
                title: 'Contact Made',
                cards: []
            }
            let demo_scheduled = {
                id: 3,
                key: 'demo_scheduled',
                title: 'Demo Scheduled',
                cards: []
            }
            let proposal_made = {
                id: 4,
                key: 'proposal_made',
                title: 'Proposal made',
                cards: []
            }
            let deal_won = {
                id: 5,
                key: 'deal_won',
                title: 'Deal won',
                cards: []
            }
            let deal_lost = {
                id: 6,
                key: 'deal_lost',
                title: 'Deal lost',
                cards: []
            }
            for (let i = 0; i < data?.data?.rows?.length; i++) {

                if (data?.data?.rows[i]?.pipeline_status === 'qualified') {
                    qualified = {
                        ...qualified,
                        cards: [
                            ...qualified.cards,
                            {
                                id: data?.data?.rows[i]?.id,
                                title: data?.data?.rows[i]?.name,
                                // description: data?.data?.rows[i]?.email,
                            }
                        ]
                    }
                }

                if (data?.data?.rows[i]?.pipeline_status === 'contact_made') {
                    contact_made = {
                        ...contact_made,
                        cards: [
                            ...contact_made.cards,
                            {
                                id: data?.data?.rows[i]?.id,
                                title: data?.data?.rows[i]?.name,
                                // description: data?.data?.rows[i]?.email,
                            }
                        ]
                    }
                }

                if (data?.data?.rows[i]?.pipeline_status === 'demo_scheduled') {
                    demo_scheduled = {
                        ...demo_scheduled,
                        cards: [
                            ...demo_scheduled.cards,
                            {
                                id: data?.data?.rows[i]?.id,
                                title: data?.data?.rows[i]?.name,
                                // description: data?.data?.rows[i]?.email,

                            }
                        ]
                    }
                }

                if (data?.data?.rows[i]?.pipeline_status === 'proposal_made') {
                    proposal_made = {
                        ...proposal_made,
                        cards: [
                            ...proposal_made.cards,
                            {
                                id: data?.data?.rows[i]?.id,
                                title: data?.data?.rows[i]?.name,
                                // description: data?.data?.rows[i]?.email,

                            }
                        ]
                    }
                }

                if (data?.data?.rows[i]?.pipeline_status === 'deal_won') {
                    deal_won = {
                        ...deal_won,
                        cards: [
                            ...deal_won.cards,
                            {
                                id: data?.data?.rows[i]?.id,
                                title: data?.data?.rows[i]?.name,
                                // description: data?.data?.rows[i]?.email,
                            }
                        ]
                    }
                }

                if (data?.data?.rows[i]?.pipeline_status === 'deal_lost') {
                    deal_lost = {
                        ...deal_lost,
                        cards: [
                            ...deal_lost.cards,
                            {
                                id: data?.data?.rows[i]?.id,
                                title: data?.data?.rows[i]?.name,
                                // description: data?.data?.rows[i]?.email,

                            }
                        ]
                    }
                }
            }
            board = [qualified, contact_made, demo_scheduled, proposal_made, deal_won, deal_lost]
            setBoard({
                columns: board
            })
        }

    }, [data?.data, setBoard]);


    const goBack = useCallback(() => {
        router.back();
    }, [router]);

    const getPipelineStatus = useCallback((columnId) => {
        switch (columnId) {
            case 1:
                return 'qualified'
            case 2:
                return 'contact_made'
            case 3:
                return 'demo_scheduled'
            case 4:
                return 'proposal_made'
            case 5:
                return 'deal_won'
            case 6:
                return 'deal_lost'
            default:
                return 'qualified'
        }
    }, []);

    const handleCardMove: OnDragEndNotification<Card> = (_card, source, destination) => {
        setBoard((currentBoard) => {
            return moveCard(currentBoard, source, destination)
        })
        updateContactApi({
            data: {
                pipeline_status: getPipelineStatus(destination?.toColumnId)
            }, contact_id: _card?.id
        })
    }

    return {
        currentUser,
        goBack,
        board, setBoard,
        handleCardMove, isLoading
    };
}

export default usePipeline;
